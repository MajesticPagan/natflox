import { NextResponse } from "next/server";

import getMovieById from "@/app/actions/getMovieById";

interface IParams {
	movieId?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
	try {
		const { movieId } = params;

		const movie = await getMovieById({ id: movieId });

		if (!movie) {
			throw new Error("Erro ao buscar informações do filme.");
		}

		return NextResponse.json(movie);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
