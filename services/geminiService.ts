import { GoogleGenAI, Type } from "@google/genai";

// Lazily initialize the GoogleGenAI instance.
let ai = null;

const getAiClient = () => {
  if (!ai) {
    // FIX: Refactored API key access to use process.env.API_KEY, adhering to the
    // @google/genai coding guidelines and resolving errors with the non-standard
    // window.process object. The API key must be available as a standard
    // environment variable.
    if (!process.env.API_KEY) {
      // Provide a more helpful error message if the key isn't found.
      throw new Error("Gemini API key is not configured. Please ensure the API_KEY environment variable is set.");
    }
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

const auroraForecastSchema = {
  type: Type.OBJECT,
  properties: {
    viewingProbability: {
      type: Type.NUMBER,
      description: 'A number between 0 and 100 representing the percentage chance of seeing the aurora.',
    },
    kpIndex: {
      type: Type.NUMBER,
      description: 'A number representing the planetary K-index (0-9).',
    },
    cloudCover: {
      type: Type.NUMBER,
      description: 'A number between 0 and 100 representing the percentage of cloud cover.',
    },
    summary: {
      type: Type.STRING,
      description: 'A brief, user-friendly text summary of the viewing conditions, mentioning factors like moon phase and visibility.',
    },
  },
  required: ['viewingProbability', 'kpIndex', 'cloudCover', 'summary'],
};


export const getAuroraForecast = async (latitude, longitude) => {
  const prompt = `Analyze meteorological and space weather data to provide a Northern Lights (Aurora Borealis) viewing forecast for the location with latitude ${latitude} and longitude ${longitude}. Consider all relevant factors, including geomagnetic activity (Kp-index), cloud cover, solar wind speed, and moon phase. Provide the output in a structured JSON format according to the provided schema. The summary should be concise and helpful for a casual observer.`;

  try {
    const client = getAiClient(); // Get or initialize the client on first use.
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: auroraForecastSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);

    // Basic validation
    if (
      typeof parsedData.viewingProbability !== 'number' ||
      typeof parsedData.kpIndex !== 'number' ||
      typeof parsedData.cloudCover !== 'number' ||
      typeof parsedData.summary !== 'string'
    ) {
      throw new Error("Received malformed data from API.");
    }

    return parsedData;

  } catch (error) {
    console.error("Error fetching from Gemini API:", error);
    // Preserve the original error message for better debugging.
    const originalMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Could not retrieve forecast from Gemini API: ${originalMessage}`);
  }
};
