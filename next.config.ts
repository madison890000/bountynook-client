import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true, // ✅ 在 build 阶段忽略 TypeScript 报错
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ 在build时跳过eslint检查
  },
};

export default withNextIntl(nextConfig);
