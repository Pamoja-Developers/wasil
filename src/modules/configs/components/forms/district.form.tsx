import AppModal from "../../../../shared/components/app.modal";
import { AppSubmitButton } from "../../../../shared/components/app.button";
import type { FormModalProps } from "../../../../shared/types/form";
import { useForm } from "react-hook-form";
import {
  defaultDistrictValues,
  districtSchema,
  type DistrictFormValues,
} from "../../schemas/district.form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppFormProvider } from "../../../../shared/components/form";
import { AppTextField } from "../../../../shared/components/form/fields/app.text.field";
import RegionSelectInput from "../../../../shared/components/form/inputs/region.select.input";

interface DistrictFormProps extends FormModalProps {}

export function DistrictForm({ isOpen, setIsOpen }: DistrictFormProps) {
  const form = useForm<DistrictFormValues>({
    resolver: zodResolver(districtSchema),
    defaultValues: defaultDistrictValues,
  });

  async function onSubmit(data: DistrictFormValues) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("FORM DATA::", data);
    setIsOpen(false);
  }

  return (
    <AppModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Add District"
      className="w-sm"
    >
      <AppFormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full mt-2 flex flex-col gap-5"
        >
          <RegionSelectInput
            control={form.control}
            name="region"
            placeholder="Select Region"
            widthClass="w-full sm:w-60"
          />
          <AppTextField
            control={form.control}
            label="District Name"
            name="name"
            placeholder="District Name"
          />
          <div className="flex justify-end">
            <AppSubmitButton label="Add" />
          </div>
        </form>
      </AppFormProvider>
    </AppModal>
  );
}
