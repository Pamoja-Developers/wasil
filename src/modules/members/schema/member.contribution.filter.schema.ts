import z, { string } from "zod";

export const memberContributionFilterSchema = z.object({
  member_id: string().trim(),
  receipt: z.string().trim(),
});

export type MemberContributionFilterFormValues = z.infer<
  typeof memberContributionFilterSchema
>;

export const defaultMemberContributionFilterFormValues: MemberContributionFilterFormValues =
  {
    member_id: "",
    receipt: "",
  };
