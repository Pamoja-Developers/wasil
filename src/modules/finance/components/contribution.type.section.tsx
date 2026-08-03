import { LuPen, LuPlus } from "react-icons/lu";
import { AppIconButton } from "../../../shared/components/app.button";
import {
  AppContentBody,
  AppContentHeader,
} from "../../../shared/components/app.content.container";
import { Can } from "../../auth/components/can";
import { AUTH_PERMISSIONS } from "../../auth/types/permissions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiQueryKeys } from "../../../api.service.config/query.config/query.keys";
import { ContributionTypeServices } from "../services/contribution.type.services";
import { useState } from "react";
import {
  TableWrapper,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  LoadingTableBody,
  TableBody,
  TableCell,
} from "../../../shared/components/table";
import ContributionTypeForm from "./forms/contribution.type.form";
import { GrClear } from "react-icons/gr";
import { IoCheckmark } from "react-icons/io5";
import type { ContributionType } from "../types/contribution.type";
import ActivationAssuaranceDialog from "../../../shared/components/activation.assuarance.dialog";
import { triggerToast } from "../../../utils/globals";
import type { ContributionTypeFormValues } from "../schema/contribution.type.schema";
import { queryClient } from "../../../api.service.config/query.config";

export default function ContributionTypeSection() {
  const [isOpenContributionTypeForm, setIsOpenContributionTypeForm] =
    useState(false);
  const [showActivationDialog, setShowActivationDialog] = useState(false);
  const [selectedContributionType, setSelectedContributionType] =
    useState<ContributionType | null>(null);

  const { data: apiResponse, isLoading } = useQuery({
    queryKey: apiQueryKeys.contributionTypes,
    queryFn: ContributionTypeServices.getManagingContributionTypes,
    staleTime: 0,
    refetchOnMount: "always",
  });

  const {
    mutateAsync: manageContributionTypeActivation,
    isPending: isTakingAction,
  } = useMutation({
    mutationKey: apiQueryKeys.contributionTypes,
    mutationFn: ContributionTypeServices.updateContributionType,
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

  const handleContributionTypeActivation = async () => {
    if (selectedContributionType != null) {
      const accountFormValues: ContributionTypeFormValues = {
        type_id: selectedContributionType.type_id,
        name: selectedContributionType.name,
        is_active: !selectedContributionType.is_active,
        account: selectedContributionType.account.account_id,
        description: selectedContributionType.description,
        is_recurring: selectedContributionType.is_recurring,
      };
      await manageContributionTypeActivation(accountFormValues);
      await queryClient.invalidateQueries({
        queryKey: apiQueryKeys.contributionTypes,
      });
    }
  };

  return (
    <>
      <AppContentHeader
        title={"Contribution Types"}
        actions={
          <Can permissions={[AUTH_PERMISSIONS.CONTRIBUTION_TYPE_ADD]}>
            <AppIconButton
              Icon={LuPlus}
              onClick={() => {
                setIsOpenContributionTypeForm(true);
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
                  title: "No Contribution Type",
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
                <TableHead>Account</TableHead>
                <TableHead>Repeatition</TableHead>
                <TableHead>Is Active</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <LoadingTableBody columns={5} />
              ) : (
                apiResponse?.data?.map((contribution, index) => (
                  <TableRow key={index} className="text-xs">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{contribution.name}</TableCell>
                    <TableCell>{contribution.account.name}</TableCell>
                    <TableCell
                      className={`font-bold ${contribution.is_recurring ? "text-blue-400" : "text-orange-400"}`}
                    >
                      {contribution.is_recurring
                        ? "Repeating"
                        : "Not repeating"}
                    </TableCell>
                    <TableCell
                      className={`font-bold ${contribution.is_active ? "text-green-400" : "text-red-400"}`}
                    >
                      {contribution.is_active ? "Yes" : "No"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <div
                          className={`p-1 border rounded-sm text-blue-900 cursor-pointer`}
                        >
                          <LuPen
                            size={15}
                            onClick={() => {
                              setSelectedContributionType(contribution);
                              setIsOpenContributionTypeForm(true);
                            }}
                          />
                        </div>
                        <div
                          className={`p-1 border rounded-sm text-slate-400 cursor-pointer ${contribution.is_active ? "hover:text-red-400" : "hover:text-green-400"}`}
                        >
                          {contribution.is_active ? (
                            <GrClear
                              size={15}
                              onClick={() => {
                                setSelectedContributionType(contribution);
                                setShowActivationDialog(true);
                              }}
                            />
                          ) : (
                            <IoCheckmark
                              size={15}
                              onClick={() => {
                                setSelectedContributionType(contribution);
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
        <ContributionTypeForm
          isOpen={isOpenContributionTypeForm}
          setIsOpen={(value) => {
            setIsOpenContributionTypeForm(value);
            if (!value) {
              setSelectedContributionType(null);
            }
          }}
          contributionType={selectedContributionType}
        />
        {selectedContributionType && (
          <ActivationAssuaranceDialog
            itemName={selectedContributionType?.name}
            isOpen={showActivationDialog}
            action={
              selectedContributionType?.is_active ? "deactivate" : "activate"
            }
            disclaimer={
              selectedContributionType?.is_active
                ? "Members won't be able to see this contribution type"
                : "Members will be able to see this contribution type"
            }
            isTakingAction={isTakingAction}
            setIsOpen={setShowActivationDialog}
            onTakingAction={handleContributionTypeActivation}
          />
        )}
      </AppContentBody>
    </>
  );
}
