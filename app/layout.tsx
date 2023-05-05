import { Roboto } from "next/font/google";

import AuthSessionProvider from "./components/providers/AuthSessionProvider";
import ToasterProvider from "./components/providers/ToasterProvider";

import getCurrentUser from "./actions/getCurrentUser";

import ClientOnly from "./components/ClientOnly";
import InfoModal from "./components/InfoModal";

import "./globals.css";

const roboto = Roboto({
	weight: ["400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
});

export const metadata = {
	title: "Natflox",
	description: "Netflix type app clone.",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
	const currentUser = await getCurrentUser();

	return (
		<html lang="en" className={`h-full ${roboto.className}`}>
			<body className="bg-zinc-900 h-full overflow-x-hidden">
				<AuthSessionProvider>
					<ClientOnly>
						<InfoModal currentUser={currentUser} />
						<ToasterProvider />
					</ClientOnly>
					{children}
				</AuthSessionProvider>
			</body>
		</html>
	);
};

export default RootLayout;
