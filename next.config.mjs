import million from "million/compiler";

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		swcPlugins: [["@swc-jotai/react-refresh", {}]],
	},
};

export default million.next(nextConfig, { auto: { rsc: true } });
