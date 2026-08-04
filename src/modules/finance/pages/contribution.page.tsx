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
} from "../schema/contribution.filter.form.schema";
import {
  LoadingTableBody,
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
import { useCallback, useEffect, useState } from "react";
import MakeContributionForm from "../components/forms/make.contribution.form";
import { useAppSelector } from "../../../shared/store";
import { useMutation } from "@tanstack/react-query";
import { ContributionServices } from "../services/contribution.services";
import type { Contribution } from "../types/contribution";
import { TransactionStatusBadge } from "../../../shared/components/badge";

export default function ContributionMainPage() {
  setPageHeader("Contribution");
  const user = useAppSelector((state) => state.authSession.user);
  const [isOpenContributionForm, setIsOpenContributionForm] = useState(false);
  const [responseMsg, setResponseMsg] = useState<string | null>(null);
  const [contributions, setContributions] = useState<Contribution[] | []>([]);

  const getDefaultValues = useCallback(
    (member_id: string): ContributionFilterFormValues => {
      return { member_id: member_id, date: "", receipt: "" };
    },
    [],
  );
  const contributionsMutation = useMutation({
    mutationFn: ContributionServices.getMemberContributions,
    onSuccess: (response) => {
      const responseCode = response.responseCode;
      const message = response.message;
      if (responseCode == 0) {
        setContributions(response.data);
      } else {
        setResponseMsg(message);
      }
    },
    onError: (error) => {
      setResponseMsg(error.message);
    },
  });
  const form = useForm<ContributionFilterFormValues>({
    resolver: zodResolver(contributionFilterSchema),
    defaultValues: defaultContributionFilterValues,
  });

  async function onSubmit(data: ContributionFilterFormValues) {
    await contributionsMutation.mutateAsync(data);
  }

  useEffect(() => {
    form.reset(getDefaultValues(user.member_id));
    void (async () => {
      const params = { member_id: user.member_id, date: "", receipt: "" };
      await contributionsMutation.mutateAsync(params);
    })();
  }, [user]);

  return (
    <AppContentContainer className="min-h-screen">
      <AppContentHeader>
        <AppFormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full my-3">
            <div className="flex flex-col items-center sm:flex-row sm:gap-3 w-full">
              <AppTextField
                control={form.control}
                name="receipt"
                placeholder="Receipt..."
                className="w-full sm:w-60"
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
        <TableWrapper
          error={
            responseMsg && (contributions?.length ?? 0) === 0
              ? {
                  title: "No Contributions",
                  message: responseMsg,
                }
              : undefined
          }
        >
          <TableCaption className="flex justify-between mb-3">
            <span>My Contribution</span>
            <AppButton
              size="xs"
              variant="secondary"
              onClick={() => setIsOpenContributionForm(true)}
            >
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
                <TableHead>Phone</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Transaction Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contributionsMutation.isPending ? (
                <LoadingTableBody columns={7} />
              ) : (
                contributions?.map((contribution, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{contribution.receipt}</TableCell>
                    <TableCell>{contribution.phone}</TableCell>
                    <TableCell>
                      {formatMoney(Number(contribution.amount))}
                    </TableCell>
                    <TableCell>{contribution.contribution_type.name}</TableCell>
                    <TableCell>
                      {convertStringToDate(contribution.created_at)}
                    </TableCell>
                    <TableCell>
                      <TransactionStatusBadge status={contribution.status} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableWrapper>
        <MakeContributionForm
          isOpen={isOpenContributionForm}
          setIsOpen={setIsOpenContributionForm}
        />
      </AppContentBody>
    </AppContentContainer>
  );
}
