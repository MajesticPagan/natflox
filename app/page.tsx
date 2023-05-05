import { redirect } from "next/navigation";

import getCurrentUser from "./actions/getCurrentUser";
import { getRandomMovie } from "./actions/getRandomMovie";
import { getMovies } from "./actions/getMovies";
import { getFavoriteMovies } from "./actions/getFavoriteMovies";

import ClientOnly from "./components/ClientOnly";
import Navbar from "./components/navbar/Navbar";
import Billboard from "./components/Billboard";
import MovieList from "./components/movies/MovieList";

const HomePage = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		redirect("/auth");
	}

	const randomMovie = await getRandomMovie();
	const movies = await getMovies();
	const favoriteMovies = await getFavoriteMovies();

	return (
		<ClientOnly>
			<Navbar />
			<Billboard movie={randomMovie} />
			<div className="pb-40">
				<MovieList movies={movies} title="Populares" currentUser={currentUser} />
				<MovieList
					movies={favoriteMovies}
					title="A Minha Lista"
					currentUser={currentUser}
				/>
			</div>
		</ClientOnly>
	);
};

export default HomePage;
