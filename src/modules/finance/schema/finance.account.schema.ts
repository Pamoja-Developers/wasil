import z from "zod";

export const financeAccountSchema = z.object({
  account_id: z.string().optional(),
  name: z.string().trim().nonempty("You must provide account name"),
  provider: z.string().trim().nonempty("You must select Method"),
  account_number: z.string().trim().nonempty("You must provide account number"),
  is_active: z.boolean().optional(),
});

export type FinanceAccountFormValues = z.infer<typeof financeAccountSchema>;

export const defaultFinanceAccountValues: FinanceAccountFormValues = {
  name: "",
  provider: "",
  account_number: "",
};
