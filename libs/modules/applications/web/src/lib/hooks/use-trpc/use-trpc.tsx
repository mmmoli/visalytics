import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@visalytics/shared-services/trpc';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

const trpc = createTRPCReact<AppRouter>();

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

export const useTRPC = () => {
  return trpc;
};
