// app/api/aspirations/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// 환경변수에서 Supabase URL과 익명 키 읽기
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET() {
  const { data, error } = await supabase
    .from("aspirations")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const { text } = await request.json();
  if (!text || text.trim() === "") {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
  }
  const { data, error } = await supabase
    .from("aspirations")
    .insert([{ text }])
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}
