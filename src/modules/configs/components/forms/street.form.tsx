import AppModal from "../../../../shared/components/app.modal";
import { AppSubmitButton } from "../../../../shared/components/app.button";

import type { FormModalProps } from "../../../../shared/types/form";
import {
  defaultStreetValues,
  streetSchema,
  type StreetFormValues,
} from "../../schemas/street.form.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppFormProvider } from "../../../../shared/components/form";
import { type SelectOption } from "../../../../shared/components/form/fields/app.select.field";
import { AppTextField } from "../../../../shared/components/form/fields/app.text.field";
import { useState } from "react";
import DistrictSelectInput from "../../../../shared/components/form/inputs/district.select.input";
import RegionSelectInput from "../../../../shared/components/form/inputs/region.select.input";
import WardSelectInput from "../../../../shared/components/form/inputs/ward.select.input";

interface StreetFormProps extends FormModalProps {}

export function StreetForm({ isOpen, setIsOpen }: StreetFormProps) {
  const [selectedRegion, setSelectedRegion] = useState<SelectOption | null>(
    null,
  );
  const [selectedDistrict, setSelectedDistrict] = useState<SelectOption | null>(
    null,
  );
  const [, setSelectedWard] = useState<SelectOption | null>(null);
  const form = useForm<StreetFormValues>({
    resolver: zodResolver(streetSchema),
    defaultValues: defaultStreetValues,
  });

  async function onSubmit(data: StreetFormValues) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("FORM DATA::", data);
    setIsOpen(false);
  }
  return (
    <AppModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Add Street"
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
            onChange={(option) => {
              if (!option) return null;
              setSelectedRegion(option);
            }}
          />
          <DistrictSelectInput
            control={form.control}
            regionId={selectedRegion?.value ?? ""}
            label="District"
            name="district"
            placeholder="Select..."
            widthClass="w-full"
            onChange={(option) => {
              if (!option) return null;
              setSelectedDistrict(option);
            }}
          />
          <WardSelectInput
            control={form.control}
            districtId={selectedDistrict?.value ?? ""}
            label="Ward"
            name="ward"
            placeholder="Select..."
            widthClass="w-full"
            onChange={(option) => {
              if (!option) return null;
              setSelectedWard(option);
            }}
          />
          <AppTextField
            control={form.control}
            label="Name"
            name="name"
            placeholder="Street Name"
          />
          <div className="flex justify-end">
            <AppSubmitButton label="Add" />
          </div>
        </form>
      </AppFormProvider>
    </AppModal>
  );
}
