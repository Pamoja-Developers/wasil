import z from "zod";

export const contributionSchema = z.object({
  contribution_type: z.string().trim().nonempty("This field is required"),
  amount: z.string().trim().nonempty("This field is required"),
  phone: z.string().trim().nonempty("This field is required"),
});

export type ContributionFormValues = z.infer<typeof contributionSchema>;

export const defaultContributionValues: ContributionFormValues = {
  contribution_type: "",
  amount: "",
  phone: "",
};
