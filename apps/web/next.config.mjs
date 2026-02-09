import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',

	experimental: {
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
		],
	},

	transpilePackages: [
		'@repo/shadcn-ui',
		'@repo/database',
		'@repo/types',
		'@repo/validations'
	],

	compiler: {
		removeConsole: isProd ? { exclude: ['error', 'warn'] } : false,
	},

	async rewrites() {
		const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4101';
		return [
			{
				source: '/api/:path*',
				destination: `${apiUrl}/api/:path*`,
			},
		];
	},

	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'vercel.com' },
			{ protocol: 'https', hostname: 'i.pravatar.cc' },
			{ protocol: 'https', hostname: 'utfs.io' },
			{ protocol: 'https', hostname: '*.ufs.sh' },
		],
	},
};

export default nextConfig;