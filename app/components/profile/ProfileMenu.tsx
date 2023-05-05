"use client";

import { useCallback, useState } from "react";
import { signOut, useSession } from "next-auth/react";

import { BsChevronDown } from "react-icons/bs";

import Image from "next/image";

const ProfileMenu = () => {
	const [isVisible, setIsVisible] = useState(false);
	const session = useSession();

	const handleMenuClick = useCallback((event: React.MouseEvent) => {
		setIsVisible((currentState) => !currentState);
	}, []);

	return (
		<div className="relative" onClick={handleMenuClick}>
			<div className="flex items-center gap-2 cursor-pointer">
				<div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
					<Image
						src="/images/default-blue.png"
						alt="Imagem de perfil"
						width={40}
						height={40}
					/>
				</div>
				<BsChevronDown
					className={`text-white transition ${isVisible ? "rotate-180" : "rotate-0"}`}
				/>
			</div>
			{isVisible && (
				<div className="bg-black w-56 absolute top-14 right-0 py-5 flex flex-col border-2 border-gray-800">
					<div className="flex flex-col gap-3">
						<div className="px-3 group/item flex gap-3 items-center w-full cursor-pointer">
							<Image
								src="/images/default-blue.png"
								alt="Imagem de perfil"
								width={32}
								height={32}
								className="w-9 rounded-md"
							/>
							<p className="text-white text-sm group-hover/item:underline">
								{session?.data?.user?.name}
							</p>
						</div>
						<hr className="bg-gray-600 border-0 h-px my-4" />
						<button
							type="button"
							className="px-3 text-center text-white text-sm hover:underline cursor-pointer"
							onClick={() => signOut()}
						>
							Terminar sessão
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfileMenu;
