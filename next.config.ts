import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true, // ✅ 在 build 阶段忽略 TypeScript 报错
  },
};

export default nextConfig;
