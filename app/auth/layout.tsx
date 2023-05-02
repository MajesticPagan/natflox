import ClientOnly from "../components/ClientOnly";
import Logo from "../components/navbar/Logo";

export const metadata = {
	title: "Iniciar sessão | Natflox",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClientOnly>
			<div className="relative w-full h-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
				<div className="w-full h-full bg-black lg:bg-opacity-50">
					<nav className="px-12 py-5">
						<Logo />
					</nav>
					<div className="flex justify-center">
						<div className="bg-black bg-opacity-70 p-16 self-center mt-2 w-full lg:w-2/5 lg:max-w-md rounded-md">
							{children}
						</div>
					</div>
				</div>
			</div>
		</ClientOnly>
	);
}
