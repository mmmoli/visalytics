import { inferRouterInputs } from '@trpc/server';
import type { AppRouter } from '@visalytics/shared-services/trpc';

export type RouterInput = inferRouterInputs<AppRouter>;

export type ApplicationFormValues =
  RouterInput['applications']['createApplication'];

export type Thing = AppRouter['applications']['createApplication'];
