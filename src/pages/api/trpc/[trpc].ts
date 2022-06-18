import { inferProcedureOutput } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { AppRouter, appRouter } from '../../../backend/router';

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});

// infer helper to get types from AppRouter
// use: `type typeOfStuffFromServer = inferQueryResponse<"some-query-id">;
export type inferQueryResponse<
  TRouteKey extends keyof AppRouter['_def']['queries']
> = inferProcedureOutput<AppRouter['_def']['queries'][TRouteKey]>;
