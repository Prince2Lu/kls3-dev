import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.notion.so',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'oaidalleapiprodscus.blob.core.windows.net',
      },
      {
        protocol: 'https',
        hostname: '*.blob.core.windows.net',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/transformation-digitale',
        destination: '/',
        statusCode: 301,
      },
      {
        source: '/transformation-digitale/',
        destination: '/',
        statusCode: 301,
      },
      {
        source: '/5-freins-frequents-a-la-transformation-digitale-en-pme-et-comment-les-lever',
        destination: '/blog/transformation-operationnelle-pme-4-pieges-changement',
        statusCode: 301,
      },
      {
        source: '/5-freins-frequents-a-la-transformation-digitale-en-pme-et-comment-les-lever/',
        destination: '/blog/transformation-operationnelle-pme-4-pieges-changement',
        statusCode: 301,
      },
    ]
  },
};

export default nextConfig;
