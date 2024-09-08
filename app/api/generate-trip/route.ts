import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { setDoc, doc } from "firebase/firestore";

import { db } from "@/app/firebase";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { place, dayCount, companions, peopleCount, budget, email } = data;

    const prompt = process.env.NEXT_PUBLIC_AI_PROMPT!
      .replace(/{PLACE}/g, place)
      .replace(/{DAYCOUNT}/g, dayCount.toString())
      .replace(/{COMPANIONS}/g, companions)
      .replace(/{PEOPLECOUNT}/g, peopleCount.toString())
      .replace(/{BUDGET}/g, budget.toString());

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

    // Send the prompt to the AI
    const result = await chatSession.sendMessage(prompt);
    const response = result.response;
    const output = response.text();

    // Save the trip data to the database
    const docId = Date.now().toString();
    try {
      const tripData = JSON.parse(output);
      await setDoc(doc(db, "Trips", docId), {
        id: docId,
        userEmail: email,
        userPreferences: { place, dayCount, companions, peopleCount, budget},
        tripData: tripData,
      });

      return NextResponse.json({ id: docId }, { status: 200 });
    } catch (error) {
      console.log("resent\n");
      try {
        // Send the prompt to the AI to fix if the output is not valid JSON
        const result2 = await chatSession.sendMessage(
          "Fix this output to be in a valid JSON format: " + output
        );
        const response2 = result2.response;
        const output2 = response2.text();

        await setDoc(doc(db, "Trips", docId), {
          id: docId,
          userEmail: email,
          userPreferences: { place, dayCount, companions, peopleCount, budget},
          tripData: JSON.parse(output2),
        });

        return NextResponse.json({ id: docId }, { status: 200 });
      } catch (error) {
        console.error("Error occurred2:", error);
        return NextResponse.json({ error: error }, { status: 500 });
      }
    }
  } catch (error) {
    console.error("Error occurred1:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
