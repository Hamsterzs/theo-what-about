import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const quoteRouter = router({
  create: publicProcedure

    .input(
      z.object({
        quotes: z.array(
          z.object({
            quote: z.string(),
            timeStamp: z.string(),
            vodId: z.string(),
          })
        ),
        password: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      if (input.password !== process.env.PASSWORD)
        throw new TRPCError({ code: "UNAUTHORIZED" });
      return ctx.prisma.quote.createMany({ data: input.quotes });
    }),
});
