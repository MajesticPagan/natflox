"use client";

import Image from "next/image";
import { BsFillPlayFill } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import { useRouter } from "next/navigation";

import { Movie } from "@prisma/client";
import { SafeUser } from "@/app/types";

import useInfoModal from "@/app/hooks/useInfoModal";

import FavoriteButton from "../FavoriteButton";

interface MovieCardProps {
	data: Movie;
	currentUser?: SafeUser | null;
}

const MovieCard: React.FC<MovieCardProps> = ({ data, currentUser }) => {
	const router = useRouter();
	const infoModal = useInfoModal();

	const handleInfoClick = () => {
		infoModal.onOpen(data?.id);
	};

	const handlePlayClick = () => {
		router.push(`/watch/${data?.id}`);
	};

	return (
		<article className="group bg-zinc-900 col-span relative h-[12vw]">
			<Image
				width={605}
				height={305}
				src={data?.thumbnailUrl}
				alt={`${data?.title}'s thumbnail`}
				className="w-full h-[12vw] cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300"
			/>

			<div className="w-full opacity-0 absolute top-0 z-10 transition duration-200 delay-300 invisible sm:visible scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100">
				<Image
					width={605}
					height={305}
					src={data?.thumbnailUrl}
					alt={`${data?.title}'s thumbnail`}
					className="w-full h-[12vw] cursor-pointer object-cover transition duration shadow-xl rounded-t-md"
				/>

				<header className="w-full bg-zinc-800 absolute z-10 p-2 lg:p-4 transition shadow-md rounded-b-md">
					<div className="flex items-center gap-3">
						<button
							type="button"
							className="w-6 h-6 lg:w-10 lg:h-10 cursor-pointer bg-white hover:bg-neutral-300 rounded-full flex justify-center items-center transition"
							onClick={handlePlayClick}
						>
							<BsFillPlayFill size={25} />
						</button>
						<FavoriteButton movieId={data?.id} currentUser={currentUser} />
						<button type="submit" className="w-6 h-6 lg:w-10 lg:h-10 ml-auto group/item cursor-pointer border-2 border-white hover:border-neutral-300 rounded-full flex justify-center items-center transition" onClick={handleInfoClick}>
							<BiChevronDown size={30} className="text-white group-hover/item:text-neutral-300" />
						</button>
					</div>

					<p className="text-green-400 font-bold mt-4">
						Novo <span className="text-white">2023</span>
					</p>

					<div className="flex items-center gap-2 mt-4">
						<p className="text-white text-xs lg:text-sm">{data?.duration}</p>
					</div>
					<div className="flex items-center gap-2 mt-4">
						<p className="text-white text-xs lg:text-sm">{data?.genre}</p>
					</div>
				</header>
			</div>
		</article>
	);
};

export default MovieCard;
