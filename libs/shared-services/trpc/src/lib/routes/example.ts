import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';

export interface Person {
  name: string;
}
const people: Person[] = [];

export const exampleRouter = createTRPCRouter({
  sayHi: publicProcedure
    .input(z.object({ name: z.string() }))
    .query((opts) => `Hi ${opts.input.name}!`),

  join: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation((opts) => {
      people.push({ name: opts.input.name });
      return people;
    }),

  people: publicProcedure.query(() => people),
});
