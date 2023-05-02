import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { compare } from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prismadb from "@/app/libs/prismadb";

/* https://next-auth.js.org/configuration/initialization#route-handlers-app */

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prismadb),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		}),
		Credentials({
			id: "credentials",
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "text",
				},
				password: {
					label: "Palavra-passe",
					type: "password",
				},
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error("O email e palavra-passe são obrigatórios.");
				}

				const user = await prismadb.user.findUnique({
					where: {
						email: credentials.email,
					},
				});

				if (!user || !user.hashedPassword) {
					throw new Error("O email não existe.");
				}

				const isCorrectPassword = await compare(credentials.password, user.hashedPassword);

				if (!isCorrectPassword) {
					throw new Error("A palavra-passe é inválida.");
				}

				return user;
			},
		}),
	],
	pages: {
		signIn: "/",
	},
	session: {
		strategy: "jwt",
	},
	jwt: {
		secret: process.env.NEXTAUTH_JWT_SECRET,
	},
	secret: process.env.NEXTAUTH_SECRET,
	debug: process.env.NODE_ENV === "development",
};

const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST };
