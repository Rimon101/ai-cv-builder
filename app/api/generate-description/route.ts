import { NextResponse } from "next/server";
import { generateStructuredText } from "@/lib/ai";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { role?: string; company?: string; keywords?: string };
    if (!body.role || !body.company) {
      return NextResponse.json({ error: "role and company are required" }, { status: 400 });
    }

    const prompt = `Generate 3-4 bullet points of professional work experience description for ${body.role} at ${body.company}. Use action verbs. Be concise and impactful.${body.keywords ? ` Include these keywords: ${body.keywords}.` : ""}`;
    const description = await generateStructuredText(prompt);
    return NextResponse.json({ description });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
