import z from "zod";

export const financeFilterSchema = z.object({
  date: z.string().trim(),
  source: z.string().trim(),
  branch: z.string().trim(),
  district: z.string().trim(),
  ward: z.string().trim(),
  street: z.string().trim(),
});

export type FinanceFilterFormValues = z.infer<typeof financeFilterSchema>;

export const defaultFinanceFilterValues: FinanceFilterFormValues = {
  date: new Date().toDateString(),
  source: "",
  branch: "",
  district: "",
  ward: "",
  street: "",
};
