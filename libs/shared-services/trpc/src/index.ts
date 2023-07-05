import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';
import { appRouter, AppRouter, API } from './lib/root';
import { createTRPCContext } from './lib/trpc';

/**
 * The `appRouter` export is used to configure the Next.js tRPC API endpoint, and the `AppRouter` type is used by the Next.js app to create the type-safe tRPC client.
 * @example
 */
export { appRouter, createTRPCContext, type AppRouter, type API };

/**
 * Inference helpers for input types
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helpers for output types
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;
