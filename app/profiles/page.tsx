import { redirect } from "next/navigation";

import getCurrentUser from "../actions/getCurrentUser";

import ClientOnly from "../components/ClientOnly";
import Profile from "../components/profile/Profile";

const ProfilesPage = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		redirect("/auth");
	}

	return (
		<ClientOnly>
			<div className="flex items-center h-full justify-center">
				<div className="flex flex-col">
					<h1 className="text-3xl md:text-6xl text-white text-center">
						Quem está a ver?
					</h1>
					<div className="flex items-center justify-center gap-8 mt-10">
						<Profile currentUser={currentUser} />
					</div>
				</div>
			</div>
		</ClientOnly>
	);
};

export default ProfilesPage;
