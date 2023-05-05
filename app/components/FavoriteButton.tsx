"use client";

import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";

import { SafeUser } from "../types";

import useFavorite from "../hooks/useFavorite";

interface FavoriteButtonProps {
	movieId: string;
	currentUser?: SafeUser | null;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId, currentUser }) => {
	const { hasFavorited, toggleFavorite, isLoading } = useFavorite({ movieId, currentUser });

	const Icon = hasFavorited ? AiOutlineCheck : AiOutlinePlus;

	return (
		<button
			type="button"
			className={`group/item w-6 h-6 lg:w-10 lg:h-10 border-2 rounded-full flex justify-center items-center transition 
			${
				hasFavorited
					? "border-green-400 hover:border-green-300"
					: "border-white hover:border-neutral-300"
			} 
			${isLoading ? 'opacity-50 cursor-default pointer-events-none' : 'cursor-pointer'}`}
			onClick={toggleFavorite}
			title={hasFavorited ? "Retirar dos favoritos" : "Adicionar aos favoritos"}
		>
			<Icon size={25} className={hasFavorited ? "text-green-400" : "text-white"} />
		</button>
	);
};

export default FavoriteButton;
