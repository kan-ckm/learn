import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";

export async function POST(request: NextRequest) {
    try {
        const { firstName, lastName, email, password, phone, address1, address2, city, state, zip, country, notes } = await request.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.insert(users).values({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone: phone || '',
            address1: address1 || '',
            address2: address2 || '',
            city: city || '',
            state: state || '',
            zip: zip || '',
            country: country || '',
            notes: notes || '',
        })
        return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'failed to register user' }, { status: 500 });
    }

}