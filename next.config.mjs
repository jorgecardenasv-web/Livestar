/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**",
      },
    ],
  },
  serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium"],
  // Incluir archivos binarios de @sparticuz/chromium en el output
  experimental: {
    outputFileTracingIncludes: {
      '/': ['./node_modules/@sparticuz/chromium/bin/**/*'],
    },
  },
};

export default nextConfig;
