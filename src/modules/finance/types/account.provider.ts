import type { SelectOption } from "../../../shared/components/form/fields/app.select.field";

export interface AccountProvider {
  name: string;
  value: number;
}

export const acountProviders: SelectOption[] = [
  {
    label: "Bank",
    value: "1",
  },
  {
    label: "Mobile Money",
    value: "2",
  },
  {
    label: "Cash",
    value: "3",
  },
  {
    label: "Cheque",
    value: "4",
  },
  {
    label: "Other",
    value: "5",
  },
];
