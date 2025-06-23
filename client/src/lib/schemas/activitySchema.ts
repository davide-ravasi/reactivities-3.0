import { z } from "zod";

export const activitySchema = z.object({
  title: z.string().min(1, "Title must be at least 1 characters long"),
});

export type ActivitySchema = z.infer<typeof activitySchema>;
