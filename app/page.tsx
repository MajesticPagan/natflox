import { redirect } from "next/navigation";

import { getSession } from "./actions/getCurrentUser";

import Navbar from "./components/navbar/Navbar";

const HomePage = async () => {
	const session = await getSession();

	if (!session) {
		redirect("/auth");
	}

	return (
		<>
			<Navbar />
		</>
	);
};

export default HomePage;
