import { NextResponse } from "next/server";
import { postsData } from "@/mocks/data";

export async function GET() {
  return NextResponse.json(postsData);
}