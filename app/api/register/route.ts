import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prismadb from "@/app/libs/prismadb";

import getUser from "@/app/actions/getUser";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { name, email, password } = body;

		const existingUser = await getUser({ email });

		if (existingUser) {
			throw new Error("Já existe um utilizador com o mesmo email.");
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await prismadb.user.create({
			data: {
				name,
				email,
				hashedPassword,
				image: "",
				emailVerified: new Date(),
			},
		});

		if (!user) {
			throw new Error("Não foi possível criar o utilizador.");
		}
		
		return NextResponse.json(user);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
