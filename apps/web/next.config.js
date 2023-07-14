//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

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
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
