"use client";

import Link from "next/link";

const Logo = () => {
	return (
		<Link href="/" className="text-red-600 hover:text-red-700 transition font-bold uppercase text-3xl select-none">
			Natflox
		</Link>
	);
};

export default Logo;
