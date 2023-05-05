import prismadb from "@/app/libs/prismadb";

interface getUserProps {
	email: string;
}

export default async function getUser(params: getUserProps) {
	try {
		const { email } = params;

		const user = await prismadb.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			return null;
		}

		return user;
	} catch (error: any) {
		console.error(error);
		return;
	}
}
