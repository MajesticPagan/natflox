"use client";

import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";

import { Movie } from "@prisma/client";

import useInfoModal from "../hooks/useInfoModal";

import Modal from "./modals/Modal";
import PlayButton from "./PlayButton";
import FavoriteButton from "./FavoriteButton";
import { SafeUser } from "../types";

interface InfoModalProps {
	currentUser?: SafeUser | null;
}

const InfoModal: React.FC<InfoModalProps> = ({ currentUser }) => {
	const [movieData, setMovieData] = useState<Movie | null>(null);
	const { isOpen, onClose, movieId } = useInfoModal();

	const fetchMovieData = async (movieId: string) => {
		return await axios
			.get(`/api/movies/${movieId}`)
			.then((response) => setMovieData(response.data));
	};

	useEffect(() => {
		if (movieId) {
			fetchMovieData(movieId);
		}
	}, [movieId]);

	let bodyContent;

	if (movieData) {
		bodyContent = (
			<>
				<div className="relative h-96">
					<video
						className="w-full h-full object-cover brightness-[60%]"
						autoPlay
						muted
						loop
						poster={movieData?.thumbnailUrl}
						src={movieData?.videoUrl}
					></video>

					<div className="absolute bottom-[10%] left-10">
						<p className="text-white text-3xl md:text-4xl lg:text-5xl font-bold h-full mb-8">
							{movieData?.title}
						</p>
						<div className="flex items-center gap-4">
							<PlayButton movieId={movieData?.id} />
							<FavoriteButton movieId={movieData?.id} currentUser={currentUser} />
						</div>
					</div>
				</div>

				<div className="px-12 py-8">
					<p className="text-green-400 font-bold text-lg">Novo</p>
					<p className="text-white text-lg">{movieData?.duration}</p>
					<p className="text-white text-lg">{movieData?.genre}</p>
					<p className="text-white text-lg">{movieData?.description}</p>
				</div>
			</>
		);
	}

	return <Modal isOpen={isOpen} body={bodyContent} onClose={onClose} />;
};

export default InfoModal;
