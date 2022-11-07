import { z } from "zod";

const createVodSchema = z.object({
  title: z.string().min(1),
  url: z.string().min(1),
  thumbnail: z.string().min(1),
  password: z.string(),
});

export default createVodSchema;
