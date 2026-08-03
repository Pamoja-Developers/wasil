import AppButton, {
  AppSubmitButton,
} from "../../../shared/components/app.button";
import {
  AppContentBody,
  AppContentContainer,
  AppContentHeader,
} from "../../../shared/components/app.content.container";
import { setPageHeader } from "../../../utils/general_hooks";
import {
  contributionFilterSchema,
  defaultContributionFilterValues,
  type ContributionFilterFormValues,
} from "../schema/contribution.filter.for.schema";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableWrapper,
} from "../../../shared/components/table";
import { convertStringToDate, formatMoney } from "../../../utils/globals";
import { MdOutlinePayments } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AppTextField } from "../../../shared/components/form/fields/app.text.field";
import { AppDatePicker } from "../../../shared/components/form/fields/date.picker/app.date.picker";
import { AppFormProvider } from "../../../shared/components/form";

export default function ContributionMainPage() {
  setPageHeader("Contribution");
  const form = useForm<ContributionFilterFormValues>({
    resolver: zodResolver(contributionFilterSchema),
    defaultValues: defaultContributionFilterValues,
  });

  async function onSubmit(data: ContributionFilterFormValues) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("FORM DATA::", data);
  }
  return (
    <AppContentContainer className="min-h-screen">
      <AppContentHeader title="My Contribution">
        <AppFormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full my-3">
            <div className="flex flex-col items-center sm:flex-row sm:gap-3 w-full">
              <AppTextField
                control={form.control}
                name="receipt"
                placeholder="Receipt..."
                className="flex-1 w-full sm:w-60"
              />
              <AppDatePicker
                control={form.control}
                name="date"
                className="w-full sm:w-60"
              />
              <AppSubmitButton label="Submit" className="h-10" />
            </div>
          </form>
        </AppFormProvider>
      </AppContentHeader>
      <AppContentBody>
        <TableWrapper>
          <TableCaption className="flex justify-between mb-3">
            <span>My Contribution</span>
            <AppButton size="xs" variant="secondary" onClick={() => {}}>
              <div className="flex flex-row items-center gap-1 py-1">
                <MdOutlinePayments /> Make Contribution
              </div>
            </AppButton>
          </TableCaption>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S/N</TableHead>
                <TableHead>Receipt</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>BGN764879</TableCell>
                <TableCell>{formatMoney(10000)}</TableCell>
                <TableCell>Membership Fee</TableCell>
                <TableCell>{convertStringToDate("2026-05-01")}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableWrapper>
      </AppContentBody>
    </AppContentContainer>
  );
}
