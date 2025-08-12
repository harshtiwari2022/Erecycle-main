import { NextRequest, NextResponse } from "next/server";
import { readJsonFile } from "@/server/storage";
import { extractBearerToken, verifyAndGetUserId } from "@/server/auth";

interface UserRecord {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  fullname: string;
  passwordHash: string;
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = extractBearerToken(authHeader);
  const userId = verifyAndGetUserId(token);

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const users = await readJsonFile<UserRecord[]>("users.json", []);
  const user = users.find(u => u.id === userId);
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const { passwordHash, ...safeUser } = user;
  return NextResponse.json(safeUser, { status: 200 });
}