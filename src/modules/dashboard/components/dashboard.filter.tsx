import { AppSubmitButton } from "../../../shared/components/app.button";
import {
  dashboardFilterSchema,
  defaultDashboardFilterValues,
  type DashboardFilterScheamValues,
} from "../schema/dashboard.filter.schema";
import { LuSlidersHorizontal } from "react-icons/lu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AppFormProvider } from "../../../shared/components/form";
import { type SelectOption } from "../../../shared/components/form/fields/app.select.field";
import { AppDatePicker } from "../../../shared/components/form/fields/date.picker/app.date.picker";
import DistrictSelectInput from "../../../shared/components/form/inputs/district.select.input";
import BranchSelectInput from "../../../shared/components/form/inputs/branch.select.input";
import { useState } from "react";
import WardSelectInput from "../../../shared/components/form/inputs/ward.select.input";
import StreetSelectInput from "../../../shared/components/form/inputs/street.select.input";

export default function DashboardFilter() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<SelectOption | null>(
    null,
  );
  const [selectedWard, setSelectedWard] = useState<SelectOption | null>(null);
  const form = useForm<DashboardFilterScheamValues>({
    resolver: zodResolver(dashboardFilterSchema),
    defaultValues: defaultDashboardFilterValues,
  });

  async function onSubmit(data: DashboardFilterScheamValues) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("FORM DATA::", data);
  }
  return (
    <div className="flex flex-col gap-3 bg-white/80 p-3 rounded-xl">
      <div className="flex text-slate-400 gap-1">
        <LuSlidersHorizontal size={18} />
        <h1 className="font-bold text-sm">Filters</h1>
      </div>
      <AppFormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
            <div className="flex-1">
              <BranchSelectInput
                control={form.control}
                name="branch"
                label="Branch/Region"
                placeholder="Select..."
                widthClass="w-full"
                onChange={(option, region) => {
                  if (!option || !region) return null;
                  setSelectedRegion(region);
                }}
              />
            </div>
            <div className="flex-1">
              <DistrictSelectInput
                control={form.control}
                regionId={selectedRegion ?? ""}
                label="District"
                name="district"
                placeholder="Select..."
                widthClass="w-full"
                onChange={(option) => {
                  if (!option) return null;
                  setSelectedDistrict(option);
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
            <div className="flex-1">
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
            </div>
            <div className="flex-1">
              <StreetSelectInput
                control={form.control}
                wardId={selectedWard?.value ?? ""}
                name="street"
                label="Street"
                placeholder="Select..."
                widthClass="w-full"
              />
            </div>
          </div>
          <div className="flex gap-2 lg:flex-col">
            <div className="flex-1">
              <AppDatePicker
                control={form.control}
                placeholder="Select Start Date"
                name="startDate"
              />
            </div>
            <div className="flex-1">
              <AppDatePicker
                control={form.control}
                placeholder="Select End Date"
                name="endDate"
              />
            </div>
          </div>
          <AppSubmitButton label="Submit" className="lg:w-full" />
        </form>
      </AppFormProvider>
    </div>
  );
}
