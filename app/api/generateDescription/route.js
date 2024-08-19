import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
    const genAI = new GoogleGenerativeAI(process.env.AI_KEY)

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const data = await req.json()
        const prompt = data.body + ". You are a Pokedex for real life. Your job is to identify the primary object in an image and provide a description for it. For example, if there is a picture of a dog that is a golden retriever you would say: ' Golden Retriever. It is a type of dog species. It is a medium to large-sized breed of dog. It is well- mannered, intelligent, and devoted. It is a popular breed for human families. It's average age is between 10 to 12 years. It's mass is around 29 to 36kg.' (Heavy emphasis on the statistics). If you cannot detect an object to describe, respond with 'No object identified.' For any object, alive or inanimate, respond as a Pokedex.";

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const entry = await response.text()

        return NextResponse.json({entry: entry})
    } catch (error) {
        console.error(error)     
    }

}








