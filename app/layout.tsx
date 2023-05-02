import { Roboto } from "next/font/google";

import AuthSessionProvider from "./components/providers/AuthSessionProvider";
import ClientOnly from "./components/ClientOnly";
import ToasterProvider from "./components/providers/ToasterProvider";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`h-full ${roboto.className}`}>
			<body className="bg-zinc-900 h-full overflow-x-hidden">
				<AuthSessionProvider>
					<ClientOnly>
						<ToasterProvider />
					</ClientOnly>
					{children}
				</AuthSessionProvider>
			</body>
		</html>
	);
}
