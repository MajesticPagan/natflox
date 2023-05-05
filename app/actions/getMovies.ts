import prismadb from "@/app/libs/prismadb";

export async function getMovies() {
	try {
		const movies = await prismadb.movie.findMany();

		return movies;
	} catch (error: any) {
		console.error(error);
		return;
	}
}
