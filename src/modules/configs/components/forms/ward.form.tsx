import AppModal from "../../../../shared/components/app.modal";
import { AppSubmitButton } from "../../../../shared/components/app.button";

import type { FormModalProps } from "../../../../shared/types/form";
import { useForm } from "react-hook-form";
import {
  defaultWardValues,
  wardSchema,
  type WardFormValues,
} from "../../schemas/ward.form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SelectOption } from "../../../../shared/components/form/fields/app.select.field";
import { AppTextField } from "../../../../shared/components/form/fields/app.text.field";
import { AppFormProvider } from "../../../../shared/components/form";
import RegionSelectInput from "../../../../shared/components/form/inputs/region.select.input";
import { useState } from "react";
import DistrictSelectInput from "../../../../shared/components/form/inputs/district.select.input";

interface WardFormProps extends FormModalProps {}

export function WardForm({ isOpen, setIsOpen }: WardFormProps) {
  const [selectedRegion, setSelectedRegion] = useState<SelectOption | null>(
    null,
  );
  const [, setSelectedDistrict] = useState<SelectOption | null>(null);
  const form = useForm<WardFormValues>({
    resolver: zodResolver(wardSchema),
    defaultValues: defaultWardValues,
  });

  async function onSubmit(data: WardFormValues) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("FORM DATA::", data);
    setIsOpen(false);
  }
  return (
    <AppModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Add Ward"
      className="w-sm"
    >
      <AppFormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-2 flex flex-col gap-5"
        >
          <RegionSelectInput
            control={form.control}
            name="region"
            placeholder="Select Region"
            widthClass="w-full sm:w-60"
            onChange={(option) => {
              if (!option) return null;
              setSelectedRegion(option);
            }}
          />

          <DistrictSelectInput
            control={form.control}
            regionId={selectedRegion?.value}
            name="district"
            placeholder="Select District"
            widthClass="w-full lg:w-xs"
            onChange={(option) => {
              if (!option) return null;
              setSelectedDistrict(option);
            }}
          />
          <AppTextField
            control={form.control}
            label="Ward Name"
            name="name"
            placeholder="Ward Name"
          />
          <div className="flex justify-end">
            <AppSubmitButton label="Add" />
          </div>
        </form>
      </AppFormProvider>
    </AppModal>
  );
}
