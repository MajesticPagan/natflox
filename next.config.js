/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**.googleusercontent.com",
			},
			{
				protocol: "https",
				hostname: "**.blender.org",
			},
		],
		domains: ["avatars.githubusercontent.com", "uhdtv.io", "upload.wikimedia.org"],
	},
};

module.exports = nextConfig;
