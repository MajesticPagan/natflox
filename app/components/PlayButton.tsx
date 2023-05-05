"use client";

import { useRouter } from "next/navigation";
import { BsFillPlayFill } from "react-icons/bs";

interface PlayButtonProps {
	movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
	const router = useRouter();

	const handlePlayClick = () => {
		router.push(`/watch/${movieId}`);
	};

	return (
		<button
			type="button"
			className="bg-white hover:bg-neutral-300 text-black rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-bold flex items-center gap-1 transition"
			onClick={handlePlayClick}
		>
			<BsFillPlayFill size={25} />
			Ver
		</button>
	);
};

export default PlayButton;
