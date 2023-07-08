// See https://trpc.io/docs/server/context#example-for-inner--outer-context

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */

export type CreateContextOptions = Record<string, never>;
