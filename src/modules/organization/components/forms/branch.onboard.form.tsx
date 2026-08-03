import { useForm } from "react-hook-form";

import {
  branchSchema,
  defaultBranchValues,
  type BranchFormValues,
} from "../../schemas/branch.form.schema";
import { AppSubmitButton } from "../../../../shared/components/app.button";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppFormProvider } from "../../../../shared/components/form";
import { AppTextField } from "../../../../shared/components/form/fields/app.text.field";
import MemberSelectInput from "../../../../shared/components/form/inputs/leader.select.input";
import RegionSelectInput from "../../../../shared/components/form/inputs/region.select.input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import BranchServices from "../../services/branch.services";
import { apiQueryKeys } from "../../../../api.service.config/query.config/query.keys";
import { triggerToast } from "../../../../utils/globals";
import { useNavigate } from "react-router-dom";

export default function BranchOnboardForm() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const form = useForm<BranchFormValues>({
    resolver: zodResolver(branchSchema),
    defaultValues: defaultBranchValues,
  });

  const branchMutation = useMutation({
    mutationFn: BranchServices.addBranch,
    onSuccess: (response) => {
      if (response.responseCode === 0) {
        navigate(-1);
      } else {
        const message = response.message;
        triggerToast(message ?? "Unknown error occurred", "error");
      }
    },
    onError: (error) => {
      triggerToast(error.message, "error");
    },
  });

  async function onSubmit(data: BranchFormValues) {
    void (async () => {
      await branchMutation.mutateAsync(data);
      await queryClient.invalidateQueries({
        queryKey: apiQueryKeys.branches,
      });
    })();
  }

  return (
    <AppFormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <AppTextField
          control={form.control}
          label="Branch Name"
          name="name"
          placeholder="Branch Name"
        />

        <RegionSelectInput
          control={form.control}
          name="location_id"
          label="Region"
          placeholder="Select Region"
          widthClass="w-full"
        />
        <MemberSelectInput
          control={form.control}
          label="Leader"
          name="leader"
          widthClass="w-full"
          placeholder="Select..."
        />
        <MemberSelectInput
          control={form.control}
          name="assistant_leader"
          label="Assistant Leader"
          widthClass="w-full"
          placeholder="Select..."
        />
        <div className="flex justify-end">
          <AppSubmitButton
            label="Submit"
            className="w-32"
            loading={branchMutation.isPending}
          />
        </div>
      </form>
    </AppFormProvider>
  );
}
