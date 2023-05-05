"use client";

import { SafeUser } from "@/app/types";
import MovieCard from "./MovieCard";

import { Movie } from "@prisma/client";

interface MovieListProps {
	title?: string;
	movies: Movie[];
	currentUser?: SafeUser | null;
}

const MovieList: React.FC<MovieListProps> = ({ title, movies, currentUser }) => {
	if (movies.length === 0) {
		return null;
	}

	return (
		<div className="px-4 md:px-12 mt-4 space-y-4">
			{title && (
				<div>
					<h3 className="text-white text-md md:text-xl lg:text-2xl font-bold">{title}</h3>
				</div>
			)}
			<div className="grid grid-cols-4 gap-2">
				{movies.map((movie) => (
					<MovieCard key={movie.id} data={movie} currentUser={currentUser} />
				))}
			</div>
		</div>
	);
};

export default MovieList;
