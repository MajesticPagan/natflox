"use client";

import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { Movie } from "@prisma/client";

interface WatchClientProps {
	movie: Movie;
}

const WatchClient: React.FC<WatchClientProps> = ({ movie }) => {
	const router = useRouter();

	const handleBackClick = () => {
		router.back();
	};

	return (
		<div className="w-screen h-screen bg-black">
			<nav className="fixed z-10 w-full p-4 flex items-center gap-8 bg-black bg-opacity-70 text-white">
				<AiOutlineArrowLeft
					size={30}
					className="cursor-pointer"
					onClick={handleBackClick}
				/>
				<div className="text-1xl lg:text-2xl 2xl:text-3xl font-bold">
					<span className="font-light">Em reprodução:</span> {movie?.title}
				</div>
			</nav>
			<video className="w-full h-full" autoPlay controls src={movie?.videoUrl}></video>
		</div>
	);
};

export default WatchClient;
