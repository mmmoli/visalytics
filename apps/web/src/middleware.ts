import { authMiddleware } from '@visalytics/modules/accounts/web/nextjs';

export default authMiddleware.middleware;

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
