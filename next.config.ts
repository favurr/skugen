import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client"],
  
  turbopack: {
    resolveAlias: {
      "@prisma/client/runtime/client": "@prisma/client/runtime/library.js",
      "@prisma/client/runtime/client.js": "@prisma/client/runtime/library.js",
      "@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs": "@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs",
      "@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs": "@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs",
    },
  },
};

export default nextConfig;
