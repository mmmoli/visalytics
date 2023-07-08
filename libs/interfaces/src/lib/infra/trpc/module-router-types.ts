import type { AnyRootConfig } from '@trpc/server';
import type { createRouterFactory } from '@trpc/server/dist/core/router';
import type { createBuilder } from '@trpc/server/dist/core/internals/procedureBuilder';

export type RouterFactory<TConfig extends AnyRootConfig> = ReturnType<
  typeof createRouterFactory<TConfig>
>;

export type BaseProcedure<TConfig extends AnyRootConfig> = ReturnType<
  typeof createBuilder<TConfig>
>;
