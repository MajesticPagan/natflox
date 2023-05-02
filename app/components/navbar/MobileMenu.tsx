"use client";

import { useCallback, useState } from "react";
import { BsChevronDown } from "react-icons/bs";

import Link from "next/link";

import { menuItems, menuItemsProps } from "@/app/constants";

interface MobileMenuProps {
	label: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ label }) => {
	const [isVisible, setIsVisible] = useState(false);

	const handleMenuClick = useCallback((event: React.MouseEvent) => {
		setIsVisible((currentState) => !currentState);
	}, []);

	return (
		<div className="block lg:hidden ml-8 relative" onClick={handleMenuClick}>
			<div className="flex items-center gap-2 cursor-pointer">
				<p className="text-white text-sm">{label}</p>
				<BsChevronDown
					className={`text-white transition ${isVisible ? "rotate-180" : "rotate-0"}`}
				/>
			</div>
			{isVisible && (
				<div className="bg-black w-56 absolute top-8 left-0 py-5 flex flex-col border-2 cursor-pointer border-gray-800">
					<div className="flex flex-col gap-4">
						{menuItems.map((item) => (
							<Link
								href={item.to}
								key={item.label}
								className="px-3 text-center text-white hover:underline"
							>
								{item.label}
							</Link>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default MobileMenu;
