"use client";

import { AiOutlineInfoCircle } from "react-icons/ai";

import { Movie } from "@prisma/client";

import PlayButton from "./PlayButton";

interface BillboardProps {
	movie: Movie;
}

const Billboard: React.FC<BillboardProps> = ({ movie }) => {
	return (
		<section className="relative h-[56.25vw]">
			<video
				autoPlay
				muted
				loop
				className="w-full h-[56.25vw] object-cover brightness-[60%]"
				poster={movie?.thumbnailUrl}
				src={movie?.videoUrl}
			></video>
			<div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16 text-white">
				<h1 className="text-1xl md:text-5xl lg:text-6xl font-bold w-6/12 h-full drop-shadow-xl">
					{movie?.title}
				</h1>
				<p className="text-xs md:text-lg mt-3 md:mt-8 w-11/12 md:w-9/12 lg:w-6/12 drop-shadow-xl">
					{movie?.description}
				</p>
				<div className="flex flex-row items-center gap-3 mt-3 md:mt-4">
					<PlayButton movieId={movie?.id} />
					<button
						type="button"
						className="bg-white bg-opacity-30 hover:bg-opacity-20 text-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-medium flex flex-row items-center gap-1 transition"
					>
						<AiOutlineInfoCircle />
						Detalhes
					</button>
				</div>
			</div>
		</section>
	);
};

export default Billboard;
