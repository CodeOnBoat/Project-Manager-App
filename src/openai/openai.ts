const openai = require("openai");

const key = "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";
const chat_completion = new openai.ChatCompletion({ apiKey: key });
const prompt = ''

export async function generateChatCompletion(message: string) {
  const messages = [
    { role: "system", content: prompt },
    { role: "user", content: "How are you doing?" },
    {
      role: "assistant",
      content:
        "{ text : 'How can I assist you with the project?', command : '', suggestions: ['']}",
    },
    {
      role: "user",
      content: "That was a good one! Can you recommend a comedy movie?",
    },
    {
      role: "assistant",
      content:
        'Of course! One highly recommended comedy movie is "The Hangover".',
    },
  ];

  const response = await chat_completion.create({
    model: "gpt-3.5-turbo",
    messages: messages,
    output_format: "json",
  });

  console.log(response);
  return response.data.choices[0].message.content;
}
