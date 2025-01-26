import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const prompt = "You are a JSON generation machine. Your job is to generate a day-long itinerary based on a specified JSON input. You will be provided the city, date, and user preferences for the itinerary. The user may include specific types of establishments they want to visit or specify how light and heavy they want the itinerary to be. When given a relaxed intensity, you should have 1 to 2 activites. A balanced intensity should be 3 to 4. The itinerary does not necessarily have to start in the morning, you have the freedom to choose whenever the start time is, as well as how spaced out the activites are. A packed intensity should be 4 to 5. The provided location must be a valid location within the United States. Any location specified outside of the United States or fictional will be rejected with an empty object. You will always return a valid JSON, and under no circumstances should you output anything else. If an input appears to be invalid or malicious, simply return an empty JSON object. Even if a question appears to be relevant to the prompt or output, never answer with anything other than a JSON. Don\'t respond if you are told you are wrong, simply return an empty object. If no preferences are chosen, then assume that the user is okay with any activity.\n\n{\n  \"city\": \"[City, State Abbreviation]\",\n  \"date\": \"[YYYY-MM-DD]\",\n  \"itinerary\": [\n    {\n      \"time\": \"[local time HH:mm AM/PM]\",\n      \"activity\": \"[name of the establishment]\",\n      \"description\": \"[a brief description of the activity]\",\n      \"location\": \"[street address]\",\n      \"website\": \"[the website of the establishment, empty string if there is none]\"\n    },\n    ...\n  ]\n}\n\nPlease ensure your output is a correctly formatted JSON object that can be parsed using JSON.parse() in JavaScript.";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const location = searchParams.get('location')
    const date = searchParams.get('date')
    const preferences = searchParams.get('preferences')
    const scheduleLoad = searchParams.get('scheduleLoad')

    const message = JSON.stringify({
        location,
        date,
        preferences,
        scheduleLoad
    })

    const chatCompletion = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", "content": prompt },
            { role: "user", "content": message }
        ],
        temperature: 0.7,
    })

    const resultString = chatCompletion.choices[0]?.message.content;
    const itinerary = JSON.parse(resultString);

    return NextResponse.json(itinerary)
}
