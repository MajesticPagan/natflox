"use client";

import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import Input from "../components/Input";

const AuthPage = () => {
	const { data: session } = useSession();
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
			callbackUrl: "/profiles",
		});
	}, [email, password]);

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

	if (session) {
		return (
			<>
				<h2 className="text-white text-3xl mb-8 font-bold">{`Sessão iniciada com ${session?.user?.name}`}</h2>
				<div className="flex flex-col items-center justify-center gap-4 mt-8">
					<button
						type="submit"
						className="p-3 rounded-md w-full mt-5 transition text-white bg-red-600 hover:bg-red-700"
						onClick={() => router.push("/profiles")}
					>
						Escolher perfil
					</button>
					<button
						type="button"
						className="relative p-3 rounded-md w-full flex items-center justify-center gap-2 text-sm font-medium transition text-gray-300 border-2 border-gray-300"
						onClick={() => signOut()}
					>
						Terminar sessão
					</button>
				</div>
			</>
		);
	}

	return (
		<>
			<h2 className="text-white text-4xl mb-8 font-bold">
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
					required
				/>
				<Input
					id="password"
					type="password"
					label="Palavra-passe"
					value={password}
					onChange={(e) => setPassword(() => e.target.value)}
					required
				/>
				<button
					type="submit"
					className="p-3 rounded-md w-full mt-5 transition text-white bg-red-600 hover:bg-red-700"
				>
					{variant === "login" ? "Entrar" : "Criar conta"}
				</button>
			</form>
			<div className="flex flex-col items- justify-center gap-4 mt-8">
				<button
					type="button"
					className="relative p-3 rounded-md w-full flex items-center justify-center gap-2 text-sm font-medium transition text-gray-300 border-2 border-gray-300"
					onClick={() => signIn("google", { callbackUrl: "/profiles" })}
				>
					<FcGoogle className="absolute top-3 left-3" size={18} />
					{`${variant === "login" ? "Entrar" : "Registrar"} com a Google`}
				</button>
				<button
					type="button"
					className="relative p-3 rounded-md w-full flex items-center justify-center gap-2 text-sm font-medium transition text-gray-300 border-2 border-gray-300"
					onClick={() => signIn("github", { callbackUrl: "/profiles" })}
				>
					<FaGithub className="absolute top-3 left-3" size={18} />
					{`${variant === "login" ? "Entrar" : "Registrar"} com o Github`}
				</button>
			</div>
			<p className="text-neutral-500 mt-10">
				{variant === "login" ? "Primeira vez a usar a Netflix?" : "Já tem uma conta?"}
				<span
					className="text-gray-300 ml-1 hover:underline cursor-pointer"
					onClick={toggleVariant}
				>
					{variant === "login" ? "Crie uma conta" : "Inicie a sessão"}
				</span>
			</p>
		</>
	);
};

export default AuthPage;
