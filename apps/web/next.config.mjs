import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
import createJiti from "jiti";

const jiti = createJiti(fileURLToPath(import.meta.url));

// Import env here to validate during build. Using jiti we can import .ts files in .js/.mjs
jiti("./lib/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Enable standalone output for Docker deployment
	output: 'standalone',

	// Turbopack root configuration for monorepo
	turbopack: {
		root: resolve(dirname(fileURLToPath(import.meta.url)), '../..'),
	},

	// Transpile monorepo packages
	transpilePackages: ['@repo/shadcn-ui', '@repo/database', '@repo/types', '@repo/validations'],

	// Build performance optimizations
	compiler: {
		// Remove console.log in production (SWC minify is enabled by default in Next.js 16)
		removeConsole: process.env.NODE_ENV === 'production' ? {
			exclude: ['error', 'warn'],
		} : false,
	},

	// Experimental optimizations for faster builds
	experimental: {
		// Optimize package imports (tree-shaking) - reduces bundle size and build time
		optimizePackageImports: [
			'@repo/shadcn-ui',
			'@repo/database',
			'lucide-react',
			'recharts',
			'@iconify/react',
			'@iconify-icons/lucide',
			'@iconify-icons/simple-icons',
			'framer-motion',
			'motion',
			'@tiptap/react',
			'@tiptap/extensions',
			'@tiptap/starter-kit',
		],
		// Disable SWC lockfile patching to suppress yarn warnings (we use bun)
		swcPlugins: [],
	},

	// Allow external images
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'vercel.com',
			},
			{
				protocol: 'https',
				hostname: 'i.pravatar.cc',
			},
			{
				protocol: 'https',
				hostname: 'utfs.io',
			},
			{
				protocol: 'https',
				hostname: '*.ufs.sh',
			},
		],
		// Disable optimization for external images (Polar URLs are already optimized)
		// This allows any HTTPS domain and improves performance
		unoptimized: true,
	},
};

export default nextConfig;
