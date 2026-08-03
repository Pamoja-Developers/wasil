import FinanceServiceEndpoint from ".";
import apiService from "../../../api.service.config";
import type { ResponseResource } from "../../../utils/response.resource";
import type { ContributionTypeFormValues } from "../schema/contribution.type.schema";
import type { ContributionType } from "../types/contribution.type";

export const ContributionTypeServices = {
  async addContributionType(
    data: ContributionTypeFormValues,
  ): Promise<ResponseResource<ContributionType | null>> {
    const response = await apiService.post<
      ResponseResource<ContributionType | null>
    >(FinanceServiceEndpoint.contributionType.add, data);
    return response.data;
  },

  async getManagingContributionTypes(): Promise<
    ResponseResource<ContributionType[]>
  > {
    const response = await apiService.get<ResponseResource<ContributionType[]>>(
      FinanceServiceEndpoint.contributionType.getManaging,
    );
    return response.data;
  },

  async getContributionTypes(
    purpose: "form" | "list",
  ): Promise<ResponseResource<ContributionType[]>> {
    const response = await apiService.get<ResponseResource<ContributionType[]>>(
      FinanceServiceEndpoint.contributionType.get,
      { params: { purpose: purpose } },
    );
    return response.data;
  },

  async updateContributionType(
    data: ContributionTypeFormValues,
  ): Promise<ResponseResource<ContributionType | null>> {
    const response = await apiService.put<
      ResponseResource<ContributionType | null>
    >(FinanceServiceEndpoint.contributionType.update, data);
    return response.data;
  },
};
