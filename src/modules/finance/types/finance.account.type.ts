import type { Branch } from "../../organization/types/branch.type";
import type { AccountProvider } from "./account.provider";

export interface FinanceAccount {
  account_id: string;
  name: string;
  account_number: string;
  provider: AccountProvider;
  branch: Branch;
  is_active: boolean;
}
