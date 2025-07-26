import { NextRequest, NextResponse } from "next/server";
import { askGemini } from "@/lib/gemeni";


export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const response = await askGemini(prompt);

    return NextResponse.json({ response });
  } catch (err) {
    console.error("Chat error:", err);
    return NextResponse.json({ error: "Failed to generate response." }, { status: 500 });
  }
}
