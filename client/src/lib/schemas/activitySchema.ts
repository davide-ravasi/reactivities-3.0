import { z } from "zod";

const requiredString = (textField: string) =>
  z
    .string({ required_error: `${textField} is required` })
    .min(1, { message: `${textField} is required` });

export const activitySchema = z.object({
  title: requiredString("Title"),
  description: requiredString("Description"),
  category: requiredString("Category"),
  date: requiredString("Date"),
  city: requiredString("City"),
  venue: requiredString("Venue"),
});

export type ActivitySchema = z.infer<typeof activitySchema>;
