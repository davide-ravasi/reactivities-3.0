import { z } from "zod";

const requiredString = (textField: string) =>
  z
    .string({ required_error: `${textField} is required` })
    .min(1, { message: `${textField} is required` });

export const activitySchema = z.object({
  title: requiredString("Title"),
  description: requiredString("Description"),
  category: requiredString("Category"),
  date: z.coerce.date({
    required_error: "Date is required",
    invalid_type_error: "Invalid date",
  }),
  location: z.object({
    venue: requiredString("Address"),
    city: z.string().optional(),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
  }),
});

export type ActivitySchema = z.infer<typeof activitySchema>;
