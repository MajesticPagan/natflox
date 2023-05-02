"use client";

import Image from "next/image";

import { SafeUser } from "../../types";
import Link from "next/link";

interface ProfileProps {
	currentUser: SafeUser;
}

const Profile: React.FC<ProfileProps> = ({ currentUser }) => {
	return (
		<Link href="/" className="group w-44 mx-auto">
			<div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden relative transition">
				<Image src="/images/default-blue.png" alt="Imagem de perfil" fill />
			</div>
			<div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
				{currentUser.name}
			</div>
		</Link>
	);
};

export default Profile;
