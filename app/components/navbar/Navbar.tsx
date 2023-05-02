"use client";

import { useEffect, useState } from "react";

import { BsSearch, BsBell } from "react-icons/bs";

import { menuItems, menuItemsProps } from "@/app/constants";

import Logo from "./Logo";
import NavbarItem from "./NavbarItem";
import MobileMenu from "./MobileMenu";
import ProfileMenu from "../profile/ProfileMenu";

const TOP_OFFSET = 65;

const Navbar = () => {
	const [isNavbarFixed, setIsNavbarFixed] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsNavbarFixed((currentState) => window.scrollY >= TOP_OFFSET);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<nav className="w-full fixed z-40">
			<div
				className={`px-4 md:px-16 py-6 flex items-center transition duration-500 ${
					isNavbarFixed && "bg-zinc-900 bg-opacity-90"
				}`}
			>
				<Logo />
				<div className="hidden lg:flex gap-7 ml-8">
					{menuItems.map((item: menuItemsProps) => (
						<NavbarItem key={item.label} label={item.label} to={item.to} />
					))}
				</div>
				<MobileMenu label="Navegar" />
				<div className="flex ml-auto gap-7 items-center">
					<div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
						<BsSearch />
					</div>
					<div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
						<BsBell />
					</div>
					<ProfileMenu />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
