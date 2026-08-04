import z, { string } from "zod";

export const contributionFilterSchema = z.object({
  member_id: string().trim().nonoptional(),
  date: z.string().trim().optional(),
  receipt: z.string().trim().optional(),
});

export type ContributionFilterFormValues = z.infer<
  typeof contributionFilterSchema
>;

export const defaultContributionFilterValues: ContributionFilterFormValues = {
  member_id: "",
  date: "",
  receipt: "",
};
