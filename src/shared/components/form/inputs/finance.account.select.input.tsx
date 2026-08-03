import type { FieldValues, FieldPath, Control } from "react-hook-form";
import { AppSelectField, type SelectOption } from "../fields/app.select.field";
import type { ResponseResource } from "../../../../utils/response.resource";
import { useQuery } from "@tanstack/react-query";
import type { FinanceAccount } from "../../../../modules/finance/types/finance.account.type";
import { apiQueryKeys } from "../../../../api.service.config/query.config/query.keys";
import { FinanceAccountServices } from "../../../../modules/finance/services/finance.account.services";
import { toSelectOptions } from "../../../../utils/globals";

interface Props<T extends FieldValues> {
  name: FieldPath<T>;
  placeholder: string;
  label?: string;
  widthClass: string;
  control: Control<T, any, T>;
  onChange?: (value: SelectOption | null) => void | null;
}

export default function FinanceAccountSelectInput<T extends FieldValues>({
  name,
  placeholder,
  control,
  label,
  widthClass,
  onChange = (_value: SelectOption | null) => {},
}: Props<T>) {
  const financeAccountOptions = useQuery<
    ResponseResource<FinanceAccount[]>,
    Error,
    SelectOption[]
  >({
    queryKey: apiQueryKeys.accounts,
    queryFn: () => FinanceAccountServices.getAccounts("form"),
    select: (response) =>
      toSelectOptions(response.data, ["name"], "account_id"),
  });
  return (
    <AppSelectField
      control={control}
      name={name}
      label={label}
      placeholder={placeholder}
      widthClass={widthClass}
      isLoading={financeAccountOptions.isLoading}
      options={financeAccountOptions.data ?? []}
      onChange={onChange}
    />
  );
}
