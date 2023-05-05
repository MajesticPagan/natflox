import prismadb from "@/app/libs/prismadb";

interface IParams {
	id?: string;
}

export default async function getMovieById(params: IParams) {
	try {
		const { id } = params;

		if (!id || typeof id !== "string") {
			throw new Error("ID inválido.");
		}

		const movie = await prismadb.movie.findUnique({
			where: {
				id,
			},
		});

		if (!movie) {
			throw new Error("Não foi encontrado nenhum filme com esse ID.");
		}

		return movie;
	} catch (error: any) {
		console.log(error);
		return;
	}
}
