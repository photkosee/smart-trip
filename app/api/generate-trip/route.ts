import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { place, dayCount, companions, peopleCount, budget } = data;

    const prompt = process.env.NEXT_PUBLIC_AI_PROMPT!
      .replace("$PLACE", place)
      .replace("$DAYCOUNT", dayCount.toString())
      .replace("$COMPANIONS", companions)
      .replace("$PEOPLECOUNT", peopleCount.toString())
      .replace("$BUDGET", budget.toString());

    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_AI_API!);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
    };

    const chatSession = model.startChat({
      generationConfig,
      // safetySettings: Adjust safety settings
      // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: process.env.NEXT_PUBLIC_AI_SAMPLE_TEXT!},
          ],
        },
        {
          role: "model",
          parts: [
            {text: process.env.NEXT_PUBLIC_AI_SAMPLE_OUTPUT!},
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage(prompt);
    const response = result.response;
    const output = response.text();

    return NextResponse.json({ output: output }, { status: 200 });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
