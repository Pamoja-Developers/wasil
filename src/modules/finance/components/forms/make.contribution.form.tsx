import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FormModalProps } from "../../../../shared/types/form";
import { MdOutlineArrowLeft, MdOutlineArrowRight } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AppModal from "../../../../shared/components/app.modal";
import { AppFormProvider } from "../../../../shared/components/form";
import { apiQueryKeys } from "../../../../api.service.config/query.config/query.keys";
import { triggerToast } from "../../../../utils/globals";
import { ContributionServices } from "../../services/contribution.services";
import {
  contributionSchema,
  defaultContributionValues,
  type ContributionFormValues,
} from "../../schema/contribution.schema";
import ContributionTypeSelectInput from "../../../../shared/components/form/inputs/contribution.type.input";
import { useEffect, useState } from "react";
import type { ContributionType } from "../../types/contribution.type";
import { AppSubmitButton } from "../../../../shared/components/app.button";
import { AppTextField } from "../../../../shared/components/form/fields/app.text.field";

export default function MakeContributionForm({
  isOpen,
  setIsOpen,
}: FormModalProps) {
  const queryClient = useQueryClient();
  const [selectedContributionType, setSelectedContributionType] =
    useState<ContributionType | null>(null);

  const [counts, setCounts] = useState(1);

  const form = useForm<ContributionFormValues>({
    resolver: zodResolver(contributionSchema),
    defaultValues: defaultContributionValues,
  });

  const contributionMutation = useMutation({
    mutationFn: ContributionServices.addContribution,
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

  async function onSubmit(data: ContributionFormValues) {
    if (selectedContributionType?.amount) {
      data["amount"] = (selectedContributionType?.amount! * counts).toString();
    }

    console.log(data);
    await contributionMutation.mutateAsync(data);
    await queryClient.invalidateQueries({
      queryKey: apiQueryKeys.contributions,
    });
  }

  function closeModal(value: boolean) {
    form.reset();
    setCounts(1);
    setSelectedContributionType(null);
    setIsOpen(value);
  }

  useEffect(() => {
    if (!selectedContributionType) return;
    const initAmount = selectedContributionType.amount * counts;
    form.setValue("amount", initAmount.toString());
  }, [selectedContributionType]);

  return (
    <AppModal
      isOpen={isOpen}
      setIsOpen={closeModal}
      title="Make Contribution"
      className="w-sm"
    >
      <AppFormProvider {...form}>
        <form
          className="mt-2 flex flex-col gap-1"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <ContributionTypeSelectInput
            control={form.control}
            name="contribution_type"
            label="Contribution type"
            placeholder="Select..."
            widthClass="w-full"
            onChange={(option, type) => {
              if (!option || !type) return null;
              setSelectedContributionType(type);
            }}
          />
          {selectedContributionType && (
            <>
              <AppTextField
                control={form.control}
                name="phone"
                label="Phone"
                placeholder="+2550000000"
                className="w-full"
              />
              <div className="flex">
                <MdOutlineArrowLeft
                  className="size-7 cursor-pointer hover:text-red-500"
                  onClick={() => {
                    if (counts > 1) {
                      const newCounts = counts - 1;
                      setCounts(newCounts);
                    }
                  }}
                />
                <AppTextField
                  name=""
                  value={counts.toString()}
                  className="w-10 h-5 px-2 text-center"
                  onChange={(value) => {
                    if (value) {
                      setCounts(Number(value));
                    }
                  }}
                />
                <MdOutlineArrowRight
                  className="size-7 cursor-pointer hover:text-green-500"
                  onClick={() => {
                    const newCounts = counts + 1;
                    setCounts(newCounts);
                  }}
                />
              </div>
              <div className="border border-slate-300/50 p-2 rounded-md text-xs">
                <div className="flex flex-col gap-2 mb-3">
                  <span className="font-bold">
                    {selectedContributionType.name}
                  </span>
                  <div className="flex flex-col">
                    <span>Amount: {selectedContributionType.amount}</span>
                    <span>Counts: {counts}</span>
                    <span>
                      Total: {selectedContributionType.amount * counts}
                    </span>
                  </div>
                </div>

                <AppSubmitButton
                  label={"Contribute"}
                  className="min-w-20 h-6 text-xs"
                  loading={contributionMutation.isPending}
                />
              </div>
            </>
          )}
        </form>
      </AppFormProvider>
    </AppModal>
  );
}
