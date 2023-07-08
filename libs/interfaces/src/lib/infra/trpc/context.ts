import { type CreateNextContextOptions } from '@trpc/server/adapters/next';

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */

type CreateContextOptions = Record<string, never>;

/**
 * This helper generates the "internals" for a tRPC context. If you need to use it, you can export
 * it from here.
 *
 * Examples of things you may need it for:
 * - testing, so we don't have to mock Next.js' req/res
 * - tRPC's `createSSGHelpers`, where we don't have req/res
 *
 * @see https://create.t3.gg/en/usage/trpc#-serverapitrpcts
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createInnerTRPCContext = (opts?: CreateContextOptions) => {
  return {
    signGuestBook: async () => {
      console.log('signGuestBook');
    },
  };
};

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createTRPCContext = (opts?: CreateNextContextOptions) => {
  return createInnerTRPCContext({});
};
