import { createEnv } from '@t3-oss/env-core';

import { z } from 'zod';

export const env = createEnv({
  clientPrefix: 'NX_PUBLIC_',
  server: {
    NX_CLERK_SECRET_KEY: z.string().min(1),
  },
  shared: {
    NX_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    NX_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1),
    NX_PUBLIC_CLERK_SIGN_UP_URL: z.string().min(1),
    NX_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string().min(1),
    NX_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string().min(1),
  },
  client: {},
  isServer: typeof window === 'undefined',
  runtimeEnv: {
    NX_CLERK_SECRET_KEY: process.env.NX_CLERK_SECRET_KEY,
    NX_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NX_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NX_PUBLIC_CLERK_SIGN_IN_URL: process.env.NX_PUBLIC_CLERK_SIGN_IN_URL,
    NX_PUBLIC_CLERK_SIGN_UP_URL: process.env.NX_PUBLIC_CLERK_SIGN_UP_URL,
    NX_PUBLIC_CLERK_AFTER_SIGN_IN_URL:
      process.env.NX_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
    NX_PUBLIC_CLERK_AFTER_SIGN_UP_URL:
      process.env.NX_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
  },
});
