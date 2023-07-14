//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const path = require('path');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },

  // Boring.
  // See https://github.com/nrwl/nx/issues/17940
  env: {
    NX_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NX_PUBLIC_CLERK_PUBLISHABLE_KEY ?? '',
    NX_PUBLIC_CLERK_SIGN_IN_URL: process.env.NX_PUBLIC_CLERK_SIGN_IN_URL ?? '',
    NX_PUBLIC_CLERK_SIGN_UP_URL: process.env.NX_PUBLIC_CLERK_SIGN_UP_URL ?? '',
    NX_PUBLIC_CLERK_AFTER_SIGN_IN_URL:
      process.env.NX_PUBLIC_CLERK_AFTER_SIGN_IN_URL ?? '',
    NX_PUBLIC_CLERK_AFTER_SIGN_UP_URL:
      process.env.NX_PUBLIC_CLERK_AFTER_SIGN_UP_URL ?? '',
    NX_DOMAIN: process.env.NX_DOMAIN ?? '',
  },

  // async headers() {
  //   return [
  //     {
  //       // matching all API routes
  //       source: '/api/:path*',
  //       headers: [
  //         { key: 'Access-Control-Allow-Credentials', value: 'true' },
  //         {
  //           key: 'Access-Control-Allow-Origin',
  //           value: process.env.NX_DOMAIN ?? 'https://www.visalytics.org',
  //         },
  //         {
  //           key: 'Access-Control-Allow-Methods',
  //           value: 'GET,OPTIONS',
  //         },
  //         {
  //           key: 'Access-Control-Allow-Headers',
  //           value:
  //             'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  //         },
  //       ],
  //     },
  //   ];
  // },

  // experimental: {
  //   outputFileTracingRoot: path.join(__dirname, '../../'),
  //   outputFileTracingExcludes: {
  //     '*': [
  //       'node_modules/.pnpm/@swc+core-linux-x64-gnu@1.3.51',
  //       'node_modules/.pnpm/@swc+core-linux-x64-musl@1.3.51',
  //       'node_modules/.pnpm/@esbuild+linux-x64@0.17.19',
  //       'node_modules/.pnpm/webpack@5.88.1_@swc+core@1.3.51',
  //       'node_modules/.pnpm/caniuse-lite@1.0.30001509',
  //       'node_modules/.pnpm/terser@5.18.2',
  //     ],
  //   },
  // },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
