import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FormModalProps } from "../../../../shared/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  defaultFinanceAccountValues,
  financeAccountSchema,
  type FinanceAccountFormValues,
} from "../../schema/finance.account.schema";
import { FinanceAccountServices } from "../../services/finance.account.services";
import { triggerToast } from "../../../../utils/globals";
import { apiQueryKeys } from "../../../../api.service.config/query.config/query.keys";
import AppModal from "../../../../shared/components/app.modal";
import { AppFormProvider } from "../../../../shared/components/form";
import { AppTextField } from "../../../../shared/components/form/fields/app.text.field";
import { AppSelectField } from "../../../../shared/components/form/fields/app.select.field";
import { acountProviders } from "../../types/account.provider";
import { AppSubmitButton } from "../../../../shared/components/app.button";
import type { FinanceAccount } from "../../types/finance.account.type";

interface FinanceAccountFormProps extends FormModalProps {
  account: FinanceAccount | null;
}
export default function FinanceAccountForm({
  isOpen,
  setIsOpen,
  account,
}: FinanceAccountFormProps) {
  const queryClient = useQueryClient();

  const form = useForm<FinanceAccountFormValues>({
    resolver: zodResolver(financeAccountSchema),
    defaultValues: defaultFinanceAccountValues,
  });

  const getDefaultValues = useCallback((): FinanceAccountFormValues => {
    if (account) {
      return {
        account_id: account.account_id,
        name: account.name,
        provider: account.provider.value.toString(),
        account_number: account.account_number,
      };
    }
    return defaultFinanceAccountValues;
  }, [account]);

  const accountMutation = useMutation({
    mutationFn: account
      ? FinanceAccountServices.updateAccount
      : FinanceAccountServices.addAccount,
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

  async function onSubmit(data: FinanceAccountFormValues) {
    await accountMutation.mutateAsync(data);
    await queryClient.invalidateQueries({
      queryKey: apiQueryKeys.accounts,
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
      title="Add Branch Account"
      className="w-sm"
    >
      <AppFormProvider {...form}>
        <form
          className="mt-2 flex flex-col gap-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <AppTextField
            control={form.control}
            label="Account Name"
            name="name"
            placeholder="Account Name"
          />
          <AppSelectField
            control={form.control}
            name="provider"
            label="Account Provider"
            placeholder="Select"
            options={acountProviders ?? []}
          />
          <AppTextField
            control={form.control}
            label="Account Number"
            name="account_number"
            placeholder="Account Number"
          />
          <div className="flex justify-end">
            <AppSubmitButton
              label={account != null ? "Update" : "Submit"}
              className="w-32"
              loading={accountMutation.isPending}
            />
          </div>
        </form>
      </AppFormProvider>
    </AppModal>
  );
}
