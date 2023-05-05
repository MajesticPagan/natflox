import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { SafeUser } from "../types";

interface useFavoriteProps {
	movieId: string;
	currentUser?: SafeUser | null;
}

const useFavorite = ({ movieId, currentUser }: useFavoriteProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const hasFavorited = useMemo(() => {
		const list = currentUser?.favoriteIds || [];
		return list.includes(movieId);
	}, [currentUser, movieId]);

	const toggleFavorite = useCallback(
		async (event: React.MouseEvent<HTMLButtonElement>) => {
			event.stopPropagation();
			setIsLoading(false);

			try {
				setIsLoading(true);

				let request;

				if (hasFavorited) {
					request = () => axios.delete(`/api/favorites/${movieId}/`);
				} else {
					request = () => axios.post(`/api/favorites/${movieId}/`);
				}

				await request();

				router.refresh();
				toast.success(
					hasFavorited ? "Retirado dos favoritos." : "Adicionado aos favoritos."
				);
			} catch (error: any) {
				console.error(error);
				toast.error("Ocorreu um erro, por favor tente novamente mais tarde.");
			}

			setIsLoading(false);
		},
		[movieId, hasFavorited, router]
	);

	return { hasFavorited, toggleFavorite, isLoading };
};

export default useFavorite;
