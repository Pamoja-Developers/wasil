import FinanceServiceEndpoint from ".";
import apiService from "../../../api.service.config";
import type { ResponseResource } from "../../../utils/response.resource";
import type { FinanceAccountFormValues } from "../schema/finance.account.schema";
import type { FinanceAccount } from "../types/finance.account.type";

export const FinanceAccountServices = {
  async addAccount(
    data: FinanceAccountFormValues,
  ): Promise<ResponseResource<FinanceAccount | null>> {
    const response = await apiService.post<
      ResponseResource<FinanceAccount | null>
    >(FinanceServiceEndpoint.account.add, data);
    return response.data;
  },

  async getAccounts(
    purpose: "form" | "list",
  ): Promise<ResponseResource<FinanceAccount[]>> {
    const response = await apiService.get<ResponseResource<FinanceAccount[]>>(
      FinanceServiceEndpoint.account.get,
      { params: { purpose: purpose } },
    );
    return response.data;
  },

  async updateAccount(
    data: FinanceAccountFormValues,
  ): Promise<ResponseResource<FinanceAccount | null>> {
    const response = await apiService.put<
      ResponseResource<FinanceAccount | null>
    >(FinanceServiceEndpoint.account.update, data);
    return response.data;
  },
};
