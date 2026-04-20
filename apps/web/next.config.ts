import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import type { NextConfig } from 'next';

const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: { mode: 'on' },
});

const nextConfig: NextConfig = {
  transpilePackages: ['@muneo/design-system'],
  reactCompiler: true,
  experimental: {
    viewTransition: true,
  },
};

export default withVanillaExtract(nextConfig);
