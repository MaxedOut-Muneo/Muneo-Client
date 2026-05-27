import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import type { NextConfig } from 'next';

const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: { mode: 'on' },
});

const nextConfig: NextConfig = {
  transpilePackages: ['@muneo/design-system'],
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/:path*`,
      },
    ];
  },
  experimental: {
    viewTransition: true,
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
};

export default withVanillaExtract(nextConfig);
