import type { ContributionType } from "./contribution.type";
import type { TransactionStatus } from "./transaction.status";

export interface Contribution {
  transaction_id: string;
  receipt: string;
  phone: string;
  contribution_type: ContributionType;
  status: TransactionStatus;
  amount: string;
  currency: string;
  created_at: string;
  completed_at: string | null;
}
