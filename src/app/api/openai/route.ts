import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

const systemPrompt: string = 'Your system prompt here';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const messages = data.messages;

    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid message format' }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      stream: true,
    });

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              const text = encoder.encode(content);
              controller.enqueue(text);
            }
          }
        } catch (err) {
          console.error('Stream error:', err);
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new NextResponse(stream);
  } catch (error) {
    console.error('Error in OpenAI API request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
