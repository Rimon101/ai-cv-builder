import { NextResponse } from "next/server";
import { generateStructuredText } from "@/lib/ai";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { jobTitle?: string };
    if (!body.jobTitle) {
      return NextResponse.json({ error: "jobTitle is required" }, { status: 400 });
    }

    const prompt = `Suggest 12-15 relevant professional skills for a ${body.jobTitle}. Return as JSON array only.`;
    const response = await generateStructuredText(prompt);
    const cleaned = response.replace(/```json|```/g, "").trim();
    const skills = JSON.parse(cleaned) as string[];
    return NextResponse.json({ skills });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
