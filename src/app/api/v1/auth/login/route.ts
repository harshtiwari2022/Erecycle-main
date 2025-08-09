import { NextRequest, NextResponse } from "next/server";
import { readJsonFile } from "@/server/storage";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface UserRecord {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  fullname: string;
  passwordHash: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password }: { email: string; password: string } = body;

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    const users = await readJsonFile<UserRecord[]>("users.json", []);
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET || "dev-secret";
    const token = jwt.sign({ sub: user.id }, secret, { expiresIn: "7d" });

    return NextResponse.json(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        phoneNumber: user.phoneNumber,
        fullname: user.fullname,
        token,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
}