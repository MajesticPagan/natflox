import { NextResponse } from "next/server";

import prismadb from "@/app/libs/prismadb";

import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
	movieId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { movieId } = params;

	if (!movieId || typeof movieId !== "string") {
		throw new Error("ID inválido.");
	}

	let favoriteIds = [...(currentUser.favoriteIds || [])];

	favoriteIds.push(movieId);

	const user = await prismadb.user.update({
		where: {
			id: currentUser.id,
		},
		data: {
			favoriteIds,
		},
	});

	return NextResponse.json(user);
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { movieId } = params;

	if (!movieId || typeof movieId !== "string") {
		throw new Error("ID inválido.");
	}

	let favoriteIds = [...(currentUser.favoriteIds || [])];

	favoriteIds = favoriteIds.filter((id) => id !== movieId);

	const user = await prismadb.user.update({
		where: {
			id: currentUser.id,
		},
		data: {
			favoriteIds,
		},
	});

	return NextResponse.json(user);
}
