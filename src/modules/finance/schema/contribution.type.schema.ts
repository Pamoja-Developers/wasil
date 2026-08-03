import z from "zod";

export const contributionTypeSchema = z.object({
  type_id: z.string().optional(),
  name: z.string().trim().nonempty("You must provide contribution name"),
  account: z.string().trim().nonempty("You must select Account"),
  description: z.string().trim().nonempty("You must provide description"),
  is_recurring: z.boolean(),
  is_active: z.boolean().optional(),
});

export type ContributionTypeFormValues = z.infer<typeof contributionTypeSchema>;

export const defaultContributionTypeValues: ContributionTypeFormValues = {
  name: "",
  account: "",
  description: "",
  is_recurring: false,
};
