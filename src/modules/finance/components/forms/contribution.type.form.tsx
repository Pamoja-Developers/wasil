import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FormModalProps } from "../../../../shared/types/form";
import type { ContributionType } from "../../types/contribution.type";
import { useForm } from "react-hook-form";
import {
  contributionTypeSchema,
  defaultContributionTypeValues,
  type ContributionTypeFormValues,
} from "../../schema/contribution.type.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { ContributionTypeServices } from "../../services/contribution.type.services";
import { triggerToast } from "../../../../utils/globals";
import { apiQueryKeys } from "../../../../api.service.config/query.config/query.keys";
import AppModal from "../../../../shared/components/app.modal";
import { AppFormProvider } from "../../../../shared/components/form";
import {
  AppTextAreaField,
  AppTextField,
} from "../../../../shared/components/form/fields/app.text.field";
import FinanceAccountSelectInput from "../../../../shared/components/form/inputs/finance.account.select.input";
import { AppCheckboxFormField } from "../../../../shared/components/form/fields/app.checkbox.field";
import { AppSubmitButton } from "../../../../shared/components/app.button";

interface ContributionTypeFormProps extends FormModalProps {
  contributionType: ContributionType | null;
}

export default function ContributionTypeForm({
  isOpen,
  setIsOpen,
  contributionType,
}: ContributionTypeFormProps) {
  const queryClient = useQueryClient();

  const form = useForm<ContributionTypeFormValues>({
    resolver: zodResolver(contributionTypeSchema),
    defaultValues: defaultContributionTypeValues,
  });

  const getDefaultValues = useCallback((): ContributionTypeFormValues => {
    if (contributionType) {
      return {
        type_id: contributionType.type_id,
        name: contributionType.name,
        account: contributionType.account.account_id,
        description: contributionType.description,
        is_recurring: contributionType.is_recurring,
      };
    }
    return defaultContributionTypeValues;
  }, [contributionType]);

  const contributionTypeMutation = useMutation({
    mutationFn: contributionType
      ? ContributionTypeServices.updateContributionType
      : ContributionTypeServices.addContributionType,
    onSuccess: (response) => {
      const responseCode = response.responseCode;
      const message = response.message;
      if (responseCode === 0) {
        triggerToast(message ?? "Success", "success");
        closeModal(false);
      } else {
        triggerToast(message ?? "Unknown error ocurred", "error");
      }
    },
    onError: (error) => {
      triggerToast(error.message, "error");
    },
  });

  async function onSubmit(data: ContributionTypeFormValues) {
    await contributionTypeMutation.mutateAsync(data);
    await queryClient.invalidateQueries({
      queryKey: apiQueryKeys.contributionTypes,
    });
  }

  function closeModal(value: boolean) {
    form.reset();
    setIsOpen(value);
  }

  useEffect(() => {
    if (isOpen) {
      form.reset(getDefaultValues());
    }
  }, [isOpen]);

  return (
    <AppModal
      isOpen={isOpen}
      setIsOpen={closeModal}
      title="Add Contribution Type"
      className="w-sm"
    >
      <AppFormProvider {...form}>
        <form
          className="mt-2 flex flex-col gap-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <AppTextField
            control={form.control}
            label="Contribution Name"
            name="name"
            placeholder="Contribution Name"
          />
          <FinanceAccountSelectInput
            control={form.control}
            name="account"
            label="Finance Account"
            placeholder="Select..."
            widthClass="w-full"
          />
          <AppTextAreaField
            control={form.control}
            rows={5}
            label="Description"
            name="description"
            placeholder="Describe the contribution for members to understand"
          />
          <AppCheckboxFormField
            control={form.control}
            name="is_recurring"
            label="This is repeating"
          />
          <div className="flex justify-end">
            <AppSubmitButton
              label={contributionType != null ? "Update" : "Submit"}
              className="w-32"
              loading={contributionTypeMutation.isPending}
            />
          </div>
        </form>
      </AppFormProvider>
    </AppModal>
  );
}
