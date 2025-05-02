import { NextResponse } from "next/server";

export async function POST(request) {
  const { adminId } = await request.json();
  if (adminId === process.env.ADMIN_ID) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: "Invalid admin ID" }, { status: 401 });
}
