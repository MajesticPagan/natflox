import prismadb from "@/app/libs/prismadb";

export async function getRandomMovie() {
	try {
		const movieCount = await prismadb.movie.count();

		if (movieCount === 0) {
			throw new Error("Não existem filmes disponíveis.");
		}

		const randomIndex = Math.floor(Math.random() * movieCount);

		const randomMovie = await prismadb.movie.findMany({
			skip: randomIndex,
			take: 1,
		});

		return randomMovie?.shift();
	} catch (error: any) {
		console.error(error);
		return;
	}
}
