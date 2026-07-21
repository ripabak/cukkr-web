import type { NextConfig } from "next";

const strapiImagePattern = (() => {
  const value = process.env.STRAPI_URL ?? "http://localhost:1337";

  try {
    const url = new URL(value);

    return {
      protocol: url.protocol.slice(0, -1) as "http" | "https",
      hostname: url.hostname,
      port: url.port,
      pathname: "/**",
    };
  } catch {
    return null;
  }
})();

const storageImagePattern = (() => {
  const value = process.env.STORAGE_ENDPOINT ?? "http://localhost:9000";

  try {
    const url = new URL(value);

    return {
      protocol: url.protocol.slice(0, -1) as "http" | "https",
      hostname: url.hostname,
      port: url.port,
      pathname: "/**",
    };
  } catch {
    return null;
  }
})();

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [strapiImagePattern, storageImagePattern].filter(Boolean) as NonNullable<typeof strapiImagePattern>[],
  },
};

export default nextConfig;
