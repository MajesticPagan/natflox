import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

import { authOptions } from "../api/auth/[...nextauth]/route";
import prismadb from "@/app/libs/prismadb";

export async function getSession() {
	return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
	try {
		const session = await getSession();

		if (!session?.user?.email) {
			throw new Error("O utilizador não tem a sessão iniciada.");
		}

		const currentUser = await prismadb.user.findUnique({
			where: {
				email: session.user.email as string,
			},
		});

		if (!currentUser) {
			throw new Error("O utilizador não tem a sessão iniciada.");
		}

		return {
			...currentUser,
			createdAt: currentUser.createdAt.toISOString(),
			updatedAt: currentUser.updatedAt.toISOString(),
			emailVerified: currentUser.emailVerified?.toISOString() || null,
		};
	} catch (error: any) {
		console.error(error);
		return null;
	}
}
