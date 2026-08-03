import { LuPen, LuPlus } from "react-icons/lu";
import { GrClear } from "react-icons/gr";
import { AppIconButton } from "../../../shared/components/app.button";
import {
  AppContentBody,
  AppContentHeader,
} from "../../../shared/components/app.content.container";
import { Can } from "../../auth/components/can";
import { AUTH_PERMISSIONS } from "../../auth/types/permissions";
import { useState } from "react";
import FinanceAccountForm from "./forms/finance.account.form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiQueryKeys } from "../../../api.service.config/query.config/query.keys";
import { FinanceAccountServices } from "../services/finance.account.services";
import {
  LoadingTableBody,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableWrapper,
} from "../../../shared/components/table";
import type { FinanceAccount } from "../types/finance.account.type";
import { queryClient } from "../../../api.service.config/query.config";
import { triggerToast } from "../../../utils/globals";
import type { FinanceAccountFormValues } from "../schema/finance.account.schema";
import ActivationAssuaranceDialog from "../../../shared/components/activation.assuarance.dialog";
import { IoCheckmark } from "react-icons/io5";

export default function FinanceAccountsSection() {
  const [isOpenAccountForm, setIsOpenAccountForm] = useState(false);
  const [showActivationDialog, setShowActivationDialog] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<FinanceAccount | null>(
    null,
  );

  const { data: apiResponse, isLoading } = useQuery({
    queryKey: apiQueryKeys.accounts,
    queryFn: () => FinanceAccountServices.getAccounts("list"),
    staleTime: 0,
    refetchOnMount: "always",
  });

  const { mutateAsync: manageAccountActivation, isPending: isTakingAction } =
    useMutation({
      mutationKey: apiQueryKeys.accounts,
      mutationFn: FinanceAccountServices.updateAccount,
      onSuccess: (response) => {
        const responseCode = response.responseCode;
        const message = response.message;
        if (responseCode == 0) {
          triggerToast(message ?? "Success", "success");
          setShowActivationDialog(false);
        } else {
          triggerToast(message ?? "Unknown error occured", "error");
        }
      },
      onError: (error) => {
        triggerToast(error.message, "error");
      },
    });

  const handleAccountActivation = async () => {
    if (selectedAccount != null) {
      const accountFormValues: FinanceAccountFormValues = {
        account_id: selectedAccount.account_id,
        name: selectedAccount.name,
        provider: selectedAccount.provider.value.toString(),
        account_number: selectedAccount.account_number,
        is_active: !selectedAccount.is_active,
      };
      await manageAccountActivation(accountFormValues);
      await queryClient.invalidateQueries({
        queryKey: apiQueryKeys.accounts,
      });
    }
  };

  return (
    <>
      <AppContentHeader
        title={"Accounts"}
        actions={
          <Can permissions={[AUTH_PERMISSIONS.ACCOUNT_ADD]}>
            <AppIconButton
              Icon={LuPlus}
              onClick={() => {
                setIsOpenAccountForm(true);
              }}
            />
          </Can>
        }
      />
      <AppContentBody>
        <TableWrapper
          className="flex flex-col"
          error={
            apiResponse?.message && (apiResponse.data?.length ?? 0) === 0
              ? {
                  title: "No Finance Account",
                  message: apiResponse.message,
                }
              : undefined
          }
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S/N</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Account Number</TableHead>
                <TableHead>Is Active</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <LoadingTableBody columns={5} />
              ) : (
                apiResponse?.data?.map((account, index) => (
                  <TableRow key={index} className="text-xs">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{account.name}</TableCell>
                    <TableCell>{account.provider.name}</TableCell>
                    <TableCell>{account.account_number}</TableCell>
                    <TableCell
                      className={`font-bold ${account.is_active ? "text-green-400" : "text-red-400"}`}
                    >
                      {account.is_active ? "Yes" : "No"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <div
                          className={`p-1 border rounded-sm text-blue-900 cursor-pointer`}
                        >
                          <LuPen
                            size={15}
                            onClick={() => {
                              setSelectedAccount(account);
                              setIsOpenAccountForm(true);
                            }}
                          />
                        </div>
                        <div
                          className={`p-1 border rounded-sm text-slate-400 cursor-pointer ${account.is_active ? "hover:text-red-400" : "hover:text-green-400"}`}
                        >
                          {account.is_active ? (
                            <GrClear
                              size={15}
                              onClick={() => {
                                setSelectedAccount(account);
                                setShowActivationDialog(true);
                              }}
                            />
                          ) : (
                            <IoCheckmark
                              size={15}
                              onClick={() => {
                                setSelectedAccount(account);
                                setShowActivationDialog(true);
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableWrapper>
        <FinanceAccountForm
          isOpen={isOpenAccountForm}
          setIsOpen={(value) => {
            setIsOpenAccountForm(value);
            if (!value) {
              setSelectedAccount(null);
            }
          }}
          account={selectedAccount}
        />
        {selectedAccount && (
          <ActivationAssuaranceDialog
            itemName={selectedAccount?.name}
            isOpen={showActivationDialog}
            action={selectedAccount?.is_active ? "deactivate" : "activate"}
            disclaimer={
              selectedAccount?.is_active
                ? "Members won't be able to add fund through this account"
                : "Members will be able to add fund through this account"
            }
            isTakingAction={isTakingAction}
            setIsOpen={setShowActivationDialog}
            onTakingAction={handleAccountActivation}
          />
        )}
      </AppContentBody>
    </>
  );
}
