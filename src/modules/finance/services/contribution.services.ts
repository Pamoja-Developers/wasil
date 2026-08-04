import FinanceServiceEndpoint from ".";
import apiService from "../../../api.service.config";
import type { ResponseResource } from "../../../utils/response.resource";
import type { ContributionFilterFormValues } from "../schema/contribution.filter.form.schema";
import type { ContributionFormValues } from "../schema/contribution.schema";
import type { Contribution } from "../types/contribution";

export const ContributionServices = {
  async addContribution(
    data: ContributionFormValues,
  ): Promise<ResponseResource<Contribution | null>> {
    const response = await apiService.post<
      ResponseResource<Contribution | null>
    >(FinanceServiceEndpoint.contribution.add, data);
    return response.data;
  },

  async getMemberContributions(
    params: ContributionFilterFormValues,
  ): Promise<ResponseResource<Contribution[]>> {
    const response = await apiService.get<ResponseResource<Contribution[]>>(
      FinanceServiceEndpoint.contribution.get,
      { params: params },
    );
    return response.data;
  },
};
