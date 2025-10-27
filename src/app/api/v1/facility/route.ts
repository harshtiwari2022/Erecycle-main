import { NextResponse } from "next/server";
import { facility } from "@/app/data/facility";

export async function GET() {
  return NextResponse.json(facility, { status: 200 });
}