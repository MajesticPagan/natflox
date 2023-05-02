"use client";

export interface menuItemsProps {
	label: string;
	to: string;
}

export const menuItems: menuItemsProps[] = [
	{
		label: "Filmes",
		to: "/movies",
	},
	{
		label: "Séries",
		to: "/series",
	},
	{
		label: "Novo & Popular",
		to: "/new-and-popular",
	},
	{
		label: "A Minha Lista",
		to: "/my-list",
	},
	{
		label: "Navegar por Linguagem",
		to: "/browse-languages",
	},
];
