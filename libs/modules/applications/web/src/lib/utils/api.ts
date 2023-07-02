import { createTRPCNext } from '@trpc/next';

export const api = createTRPCNext<AppRouter>({
  config: () => ({}),
});
