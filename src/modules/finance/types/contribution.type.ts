import type { FinanceAccount } from "./finance.account.type";

export interface ContributionType {
  type_id: string;
  name: string;
  account: FinanceAccount;
  description: string;
  is_recurring: boolean;
  is_active: boolean;
}
