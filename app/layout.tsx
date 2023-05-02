import ClientOnly from "./components/ClientOnly";
import ToasterProvider from "./components/providers/ToasterProvider";

import "./globals.css";

export const metadata = {
	title: "Natflox",
	description: "Netflix type app clone.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="h-full">
			<body className="bg-zinc-900 h-full overflow-x-hidden">
				<ClientOnly>
					<ToasterProvider />
				</ClientOnly>
				{children}
			</body>
		</html>
	);
}
