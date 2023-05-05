import { redirect } from "next/navigation";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getMovieById from "@/app/actions/getMovieById";

import ClientOnly from "@/app/components/ClientOnly";
import WatchClient from "./WatchClient";

interface IParams {
	id?: string;
}

const WatchPage = async ({ params }: { params: IParams }) => {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		redirect("/auth");
	}

	const movie = await getMovieById(params);

	if (!movie) {
		return (
			<ClientOnly>
				<p className="text-white">Não foi possível carregar o filme.</p>
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<WatchClient movie={movie} />
		</ClientOnly>
	);
};

export default WatchPage;
