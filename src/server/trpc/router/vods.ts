import { TRPCError } from "@trpc/server";
import { z } from "zod";
import createVodSchema from "../../../Schemas/vods";
import { router, publicProcedure } from "../trpc";

export const vodRouter = router({
  getAll: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.vod.findMany({
      where: {
        quotes: {
          some: {
            quote: {
              contains: input,
            },
          },
        },
      },
      include: {
        quotes: {
          where: {
            quote: {
              contains: input,
            },
          },
        },
      },
      orderBy: [{ id: "desc" }],
    });
  }),
  create: publicProcedure.input(createVodSchema).mutation(({ ctx, input }) => {
    if (input.password !== process.env.PASSWORD)
      throw new TRPCError({ code: "UNAUTHORIZED" });

    const { thumbnail, title, url } = input;

    return ctx.prisma.vod.create({ data: { thumbnail, title, url } });
  }),
});
