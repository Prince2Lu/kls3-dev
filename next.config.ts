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
  async headers() {
    return [
      {
        source: '/demo/pefferkorn-baillot-thines/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, nosnippet, noimageindex',
          },
        ],
      },
    ]
  },
  async redirects() {
    // Anciennes pages de l'ancien positionnement, redirigées vers les sections de la home
    const oldPages = [
      { source: '/frictions', destination: '/#solutions' },
      { source: '/methode', destination: '/#methode' },
      { source: '/cas-clients', destination: '/#realisations' },
      { source: '/a-propos', destination: '/#equipe' },
      { source: '/contact', destination: '/#contact' },
      // Exact : les sous-pages /solutions/* restent servies
      { source: '/solutions', destination: '/#solutions' },
    ]

    return [
      ...oldPages.flatMap(({ source, destination }) => [
        { source, destination, statusCode: 301 as const },
        { source: `${source}/`, destination, statusCode: 301 as const },
      ]),
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
