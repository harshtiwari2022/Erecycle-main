import { NextRequest, NextResponse } from "next/server";
import { readJsonFile, writeJsonFile } from "@/server/storage";

interface BookingData {
  userId: string;
  userEmail: string;
  recycleItem: string;
  recycleItemPrice: number;
  pickupDate: string;
  pickupTime: string;
  facility: string;
  fullName: string;
  address: string;
  phone: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<BookingData>;

    const requiredFields: (keyof BookingData)[] = [
      "userId",
      "userEmail",
      "recycleItem",
      "recycleItemPrice",
      "pickupDate",
      "pickupTime",
      "facility",
      "fullName",
      "address",
      "phone",
    ];

    for (const field of requiredFields) {
      if (body[field] === undefined || body[field] === null || body[field] === "") {
        return NextResponse.json({ message: `Missing field: ${field}` }, { status: 400 });
      }
    }

    const bookings = await readJsonFile<BookingData[]>("bookings.json", []);
    bookings.push(body as BookingData);
    await writeJsonFile("bookings.json", bookings);

    return NextResponse.json({ message: "Booking created" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
}