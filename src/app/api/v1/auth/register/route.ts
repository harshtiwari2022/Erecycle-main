import { NextRequest, NextResponse } from "next/server";
import { readJsonFile, writeJsonFile } from "@/server/storage";
import bcrypt from "bcryptjs";

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
    const {
      fullName,
      username,
      email,
      phoneNumber,
      password,
      confirmPassword,
    }: {
      fullName: string;
      username: string;
      email: string;
      phoneNumber: string;
      password: string;
      confirmPassword?: string;
    } = body;

    if (!fullName || !username || !email || !phoneNumber || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    if (confirmPassword !== undefined && confirmPassword !== password) {
      return NextResponse.json({ message: "Passwords do not match" }, { status: 400 });
    }

    const users = await readJsonFile<UserRecord[]>("users.json", []);

    const exists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase() || u.username.toLowerCase() === username.toLowerCase()
    );
    if (exists) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const id = globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2);

    const record: UserRecord = {
      id,
      username,
      email,
      phoneNumber,
      fullname: fullName,
      passwordHash,
    };

    users.push(record);
    await writeJsonFile("users.json", users);

    return NextResponse.json({ message: "Registered" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
}