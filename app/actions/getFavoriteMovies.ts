import prismadb from "@/app/libs/prismadb";

import getCurrentUser from "./getCurrentUser";

export async function getFavoriteMovies() {
	try {
		const currentUser = await getCurrentUser();

		const favoriteMovies = await prismadb.movie.findMany({
			where: {
				id: {
					in: currentUser?.favoriteIds,
				},
			},
		});

		return favoriteMovies;
	} catch (error: any) {
		console.error(error);
		return;
	}
}
