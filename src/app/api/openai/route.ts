import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

const systemPrompt: string = 'You are a chatbot assisting students from Stony Brook University find research opportunities. Please mainly focus on providing ample information about the research question that they are inquiring about and provide suggestions for adjacent information that they may be interested in; for example, if they ask about a math professor that does research in a certain field, mention other professors that do research in the same field. Also, change the language you respond in based on the language that the user speaks in.';

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
          console.log(err);
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
