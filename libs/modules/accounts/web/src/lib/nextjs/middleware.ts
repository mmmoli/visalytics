import { authMiddleware as clerkAuthMiddleware } from '@clerk/nextjs';
import { env } from '../../env';

export const middleware = clerkAuthMiddleware({
  secretKey: env.NX_CLERK_SECRET_KEY,
  publishableKey: env.NX_PUBLIC_CLERK_PUBLISHABLE_KEY,
  publicRoutes: [
    '/',
    env.NX_PUBLIC_CLERK_SIGN_IN_URL,
    env.NX_PUBLIC_CLERK_SIGN_UP_URL,
  ],
});
