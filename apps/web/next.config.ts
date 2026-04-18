import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import type { NextConfig } from 'next';

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  transpilePackages: ['@muneo/design-system'],
  experimental: {
    reactCompiler: true,
    viewTransition: true,
  },
};

export default withVanillaExtract(nextConfig);
