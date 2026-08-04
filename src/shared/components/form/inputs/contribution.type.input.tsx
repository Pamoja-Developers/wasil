import type { FieldValues, FieldPath, Control } from "react-hook-form";
import { AppSelectField, type SelectOption } from "../fields/app.select.field";
import type { ContributionType } from "../../../../modules/finance/types/contribution.type";
import type { ResponseResource } from "../../../../utils/response.resource";
import { useQuery } from "@tanstack/react-query";
import { apiQueryKeys } from "../../../../api.service.config/query.config/query.keys";
import { ContributionTypeServices } from "../../../../modules/finance/services/contribution.type.services";
import { toSelectOptions } from "../../../../utils/globals";
import { useState } from "react";

interface Props<T extends FieldValues> {
  name: FieldPath<T>;
  placeholder: string;
  label?: string;
  widthClass: string;
  control: Control<T, any, T>;
  onChange?: (
    value: SelectOption | null,
    type: ContributionType | null,
  ) => void | null;
}

export default function ContributionTypeSelectInput<T extends FieldValues>({
  name,
  placeholder,
  control,
  label,
  widthClass,
  onChange = (
    _value: SelectOption | null,
    _type: ContributionType | null,
  ) => {},
}: Props<T>) {
  const [types, setTypes] = useState<ContributionType[] | null>(null);
  const financeAccountOptions = useQuery<
    ResponseResource<ContributionType[]>,
    Error,
    SelectOption[]
  >({
    queryKey: apiQueryKeys.contributionTypes,
    queryFn: () => ContributionTypeServices.getContributionTypes("form"),
    staleTime: 0,
    refetchOnMount: "always",
    select: (response) => {
      setTypes(response.data);
      return toSelectOptions(response.data, ["name"], "type_id");
    },
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
      onChange={(option) => {
        const selectedType = types?.find(
          (item) => item.type_id === option?.value,
        );

        if (selectedType) {
          onChange(option, selectedType);
        }
      }}
    />
  );
}
