import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	turbopack: {},
	// Note: Provide an explicit `turbopack` object to satisfy Next.js config validation.
	// If you want to opt out of Turbopack entirely, we can migrate to using a `webpack`-only dev command
	// or configure Turbopack rules to match your custom webpack loaders.
	experimental: {
		mdxRs: true
	},

};

export default withContentlayer(nextConfig);
