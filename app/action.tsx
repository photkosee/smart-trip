import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { db } from "@/app/firebase";
import { toast } from "@/hooks/use-toast";

export const fetchImage = async (
  data: { textQuery: string },
  setImage: React.Dispatch<React.SetStateAction<string>>
) => {
  // fetching a list of photos by given place name from Places API Search Text
  await axios
    .post(process.env.NEXT_PUBLIC_GOOGLE_PLACE_BASE_URL!, data, {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_PLACE_API!,
        "X-Goog-FieldMask": ["places.photos"],
      },
    })
    .then((res) => {
      if (
        !res.data.places ||
        !res.data.places[0]?.photos ||
        !res.data.places[0]?.photos[0]?.name
      )
        return;

      // rendering the first photo from the list with Place Photos
      const imageUrl = process.env.NEXT_PUBLIC_GOOGLE_PLACE_PHOTO_REF!.replace(
        "{NAME}",
        res.data.places[0].photos[0].name
      );
      setImage(imageUrl);
    });
};

export const geminiGenerateTrip = async ({
  place,
  dayCount,
  companions,
  peopleCount,
  budget,
  email,
}: {
  place: string;
  dayCount: number;
  companions: string;
  peopleCount: number;
  budget: string;
  email: string;
}) => {
  try {
    const prompt = process.env
      .NEXT_PUBLIC_AI_PROMPT!.replace(/{PLACE}/g, place)
      .replace(/{DAYCOUNT}/g, dayCount.toString())
      .replace(/{COMPANIONS}/g, companions)
      .replace(/{PEOPLECOUNT}/g, peopleCount.toString())
      .replace(/{BUDGET}/g, budget.toString());

    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GOOGLE_AI_API!
    );
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
          parts: [{ text: process.env.NEXT_PUBLIC_AI_SAMPLE_TEXT! }],
        },
        {
          role: "model",
          parts: [{ text: process.env.NEXT_PUBLIC_AI_SAMPLE_OUTPUT! }],
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
        userPreferences: { place, dayCount, companions, peopleCount, budget },
        tripData: tripData,
      });

      return docId;
    } catch (error) {
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
          userPreferences: { place, dayCount, companions, peopleCount, budget },
          tripData: JSON.parse(output2),
        });

        return docId;
      } catch (error) {
        toast({
          title: "Error",
          description: error as string,
          variant: "destructive",
        });

        return "";
      }
    }
  } catch (error) {
    toast({
      title: "Error",
      description: error as string,
      variant: "destructive",
    });

    return "";
  }
};
