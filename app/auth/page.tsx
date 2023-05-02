"use client";

import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import ClientOnly from "../components/ClientOnly";
import Input from "../components/Input";

const Auth = () => {
	const router = useRouter();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [variant, setVariant] = useState("login");
	const [isLoading, setIsLoading] = useState(false);

	const toggleVariant = useCallback(() => {
		setVariant((currentState) => (currentState === "login" ? "register" : "login"));
	}, []);

	const onLogin = useCallback(() => {
		setIsLoading(true);

		signIn("credentials", {
			email,
			password,
			redirect: false,
		}).then((callback) => {
			setIsLoading(false);

			if (callback?.ok) {
				toast.success("Sessão iniciada com sucesso.");
				setTimeout(() => router.push("/"), 500);
			} else if (callback?.error) {
				toast.error(callback.error);
			}
		});
	}, [email, password, router]);

	const onRegister = useCallback(() => {
		setIsLoading(true);

		axios
			.post("/api/register", {
				name,
				email,
				password,
			})
			.then(() => {
				toast.success("Conta criada com sucesso.");
				setName("");
				setEmail("");
				setPassword("");

				onLogin();
			})
			.catch((error) => {
				toast.error(error.response.data.error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [name, email, password, onLogin]);

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		if (variant === "login") {
			onLogin();
		} else {
			onRegister();
		}
	};

	return (
		<ClientOnly>
			<div className="relative w-full h-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
				<div className="w-full h-full bg-black lg:bg-opacity-50">
					<nav className="px-12 py-5">
						<span className="text-red-600 font-bold uppercase text-4xl select-none">
							Natflox
						</span>
					</nav>
					<div className="flex justify-center">
						<div className="bg-black bg-opacity-70 p-16 self-center mt-2 w-full lg:w-2/5 lg:max-w-md rounded-md">
							<h2 className="text-white text-4xl mb-8 font-semibold">
								{variant === "login" ? "Iniciar sessão" : "Registrar"}
							</h2>
							<form
								className={`flex flex-col gap-4 transition ${
									isLoading && "opacity-70 cursor-not-allowed"
								}`}
								onSubmit={onSubmit}
							>
								{variant === "register" && (
									<Input
										id="name"
										label="Nome de utilizador"
										value={name}
										onChange={(e) => setName(() => e.target.value)}
									/>
								)}
								<Input
									id="email"
									type="email"
									label="Email"
									value={email}
									onChange={(e) => setEmail(() => e.target.value)}
								/>
								<Input
									id="password"
									type="password"
									label="Palavra-passe"
									value={password}
									onChange={(e) => setPassword(() => e.target.value)}
								/>
								<button
									type="submit"
									className="p-3 rounded-md w-full mt-5 transition text-white bg-red-600 hover:bg-red-700"
								>
									{variant === "login" ? "Entrar" : "Criar conta"}
								</button>
							</form>
							<div className="flex flex-col items-center gap-4 mt-8 justify-center">
								<button
									type="button"
									className="relative p-3 rounded-md w-full flex items-center justify-center gap-2 text-sm font-semibold transition text-gray-300 border-2 border-gray-300"
									onClick={() => signIn("google", { callbackUrl: "/" })}
								>
									<FcGoogle className="absolute top-3 left-3" size={18} />
									Entrar com a Google
								</button>
								<button
									type="button"
									className="relative p-3 rounded-md w-full flex items-center justify-center gap-2 text-sm font-semibold transition text-gray-300 border-2 border-gray-300"
									onClick={() => signIn("github", { callbackUrl: "/" })}
								>
									<FaGithub className="absolute top-3 left-3" size={18} />
									Entrar com o Github
								</button>
							</div>
							<p className="text-neutral-500 mt-10">
								{variant === "login"
									? "Primeira vez a usar a Netflix?"
									: "Já tem uma conta?"}
								<span
									className="text-gray-300 ml-1 hover:underline cursor-pointer"
									onClick={toggleVariant}
								>
									{variant === "login" ? "Crie uma conta" : "Inicie a sessão"}
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</ClientOnly>
	);
};

export default Auth;
