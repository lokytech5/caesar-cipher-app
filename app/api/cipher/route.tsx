import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
    return NextResponse.json("Hello world")
}

export async function POST(request: NextRequest){
    const body = await request.json()
}