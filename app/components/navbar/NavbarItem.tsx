"use client";

import Link from "next/link";

import { menuItemsProps } from "@/app/constants";

const NavbarItem: React.FC<menuItemsProps> = ({ label, to }) => {
	return (
		<Link href={to} className="text-white cursor-pointer hover:text-gray-300 transition">
			{label}
		</Link>
	);
};

export default NavbarItem;
