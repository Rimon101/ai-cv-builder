import { NextResponse } from "next/server";
import { generateStructuredText } from "@/lib/ai";
import type { CVData } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { cvData?: Partial<CVData> };
    if (!body.cvData) {
      return NextResponse.json({ error: "cvData is required" }, { status: 400 });
    }

    const prompt = `Write a 3-sentence professional summary for a CV. Based on: name, current role, years of experience, top skills. Make it confident and ATS-friendly.
Data: ${JSON.stringify(body.cvData)}`;
    const summary = await generateStructuredText(prompt);
    return NextResponse.json({ summary });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
