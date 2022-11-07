import { router } from "../trpc";
import { exampleRouter } from "./example";
import { quoteRouter } from "./quotes";
import { vodRouter } from "./vods";

export const appRouter = router({
  example: exampleRouter,
  vod: vodRouter,
  quote: quoteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
