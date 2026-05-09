import { NextResponse } from "next/server";
import { generateStructuredText } from "@/lib/ai";
import type { CVData } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { cvData?: CVData };
    if (!body.cvData) {
      return NextResponse.json({ error: "cvData is required" }, { status: 400 });
    }

    const prompt = `Analyze this CV data for ATS compatibility. Return JSON with: score (0-100) and feedback array with 3-5 specific improvement tips.
Data: ${JSON.stringify(body.cvData)}`;
    const response = await generateStructuredText(prompt);
    const cleaned = response.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned) as { score: number; feedback: string[] };
    return NextResponse.json(parsed);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
