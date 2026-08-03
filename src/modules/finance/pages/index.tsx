import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AppSubmitButton } from "../../../shared/components/app.button";
import {
  AppContentBody,
  AppContentContainer,
} from "../../../shared/components/app.content.container";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableWrapper,
} from "../../../shared/components/table";
import { setPageHeader } from "../../../utils/general_hooks";
import {
  convertStringToDate,
  formatMoney,
  shortenNumber,
} from "../../../utils/globals";

import {
  defaultFinanceFilterValues,
  financeFilterSchema,
  type FinanceFilterFormValues,
} from "../schema/finance.filter.form.schema";
import { financeSources } from "../types/finance.source";
import { AppDatePicker } from "../../../shared/components/form/fields/date.picker/app.date.picker";
import {
  AppSelectField,
  type SelectOption,
} from "../../../shared/components/form/fields/app.select.field";
import { AppFormProvider } from "../../../shared/components/form";
import { useState } from "react";
import BranchSelectInput from "../../../shared/components/form/inputs/branch.select.input";
import DistrictSelectInput from "../../../shared/components/form/inputs/district.select.input";
import WardSelectInput from "../../../shared/components/form/inputs/ward.select.input";

export default function FinanceMainPage() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<SelectOption | null>(
    null,
  );
  const [, setSelectedWard] = useState<SelectOption | null>(null);
  const form = useForm<FinanceFilterFormValues>({
    resolver: zodResolver(financeFilterSchema),
    defaultValues: defaultFinanceFilterValues,
  });

  async function onSubmit(data: FinanceFilterFormValues) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("FORM DATA::", data);
  }
  setPageHeader("Finance");
  return (
    <AppContentContainer>
      <AppContentBody>
        <AppFormProvider {...form}>
          <form className="w-full my-3" onSubmit={form.handleSubmit(onSubmit)}>
            <AppDatePicker
              control={form.control}
              name="date"
              className="w-full mb-3"
            />
            <div className="w-full flex flex-col sm:flex-wrap sm:flex-row gap-3">
              <AppSelectField
                control={form.control}
                name="source"
                placeholder="Select Source"
                widthClass="w-full sm:flex-1 lg:w-60"
                options={financeSources}
              />
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
              <AppSubmitButton label="Submit" className="h-10" />
            </div>
          </form>
        </AppFormProvider>

        <div className="flex flex-wrap my-5 gap-5">
          <FinanceStatCard title="Total Revenue" statValue={3000000} />
          <FinanceStatCard
            title="Total Member Contribution"
            statValue={1000000}
          />
          <FinanceStatCard title="Total Expenditure" statValue={500000} />
        </div>

        <TableWrapper className="my-3">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S/N</TableHead>
                <TableHead>Sender</TableHead>
                <TableHead>Receipt</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>User Test Name</TableCell>
                <TableCell>ER45677</TableCell>
                <TableCell>{formatMoney(10000)}</TableCell>
                <TableCell>{convertStringToDate("2026-05-24")}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableWrapper>
      </AppContentBody>
    </AppContentContainer>
  );
}

function FinanceStatCard({
  title,
  statValue,
}: {
  title: string;
  statValue: number;
}) {
  return (
    <div className="w-full sm:w-48 bg-slate-300/30 p-3 rounded-xl">
      <div className="flex flex-col gap-5 text-gray-600">
        <span className="text-xl">{shortenNumber(statValue)}</span>
        <span className="text-xs">{title}</span>
      </div>
    </div>
  );
}
