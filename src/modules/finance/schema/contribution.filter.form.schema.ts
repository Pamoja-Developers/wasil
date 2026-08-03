import z from "zod";

export const contributionFilterSchema = z.object({
  date: z.string().trim(),
  receipt: z.string().trim(),
});

export type ContributionFilterFormValues = z.infer<
  typeof contributionFilterSchema
>;

export const defaultContributionFilterValues: ContributionFilterFormValues = {
  date: "",
  receipt: "",
};
