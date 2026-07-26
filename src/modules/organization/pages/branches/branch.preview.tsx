import { Link, useNavigate, useParams } from "react-router-dom";
import { setPageHeader } from "../../../../utils/general_hooks";
import {
  AppContentBody,
  AppContentContainer,
  AppContentHeader,
} from "../../../../shared/components/app.content.container";
import type { BranchLeader } from "../../types/leadership.type";
import AppButton from "../../../../shared/components/app.button";
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
} from "../../../../shared/components/table";
import { type Member } from "../../../members/types/member.type";
import { ROUTE_PATHS } from "../../../router/route.paths";
import {
  LuCircleUser,
  LuEye,
  LuMail,
  LuMapPinHouse,
  LuPen,
  LuPhone,
} from "react-icons/lu";
import { useEffect, useState } from "react";
import BranchServices from "../../services/branch.services";
import { useMutation } from "@tanstack/react-query";
import type { Branch } from "../../types/branch.type";
import NotFound from "../../../../shared/components/not-found";
import { getFullName } from "../../../../utils/globals";
import { AUTH_PERMISSIONS } from "../../../auth/types/permissions";
import { Can } from "../../../auth/components/can";

export default function BranchPreview() {
  const { branchId } = useParams();
  const navigate = useNavigate();

  const [branch, setBranch] = useState<Branch | null>(null);
  const [members, setMembers] = useState<Member[] | []>([]);
  const [branchResponseMsg, setBranchResponseMsg] = useState<string | null>(
    null,
  );
  const [memberResponseMsg, setMemberResponseMsg] = useState<string | null>(
    null,
  );

  setPageHeader("Branch Preview", "Back To Branches", [
    AUTH_PERMISSIONS.BRANCH_VIEW,
  ]);

  const branchMutation = useMutation({
    mutationFn: BranchServices.getBranchDetails,
    onSuccess: (response) => {
      const responseCode = response.responseCode;
      const message = response.message;
      if (responseCode == 0) {
        setBranch(response.data);
      } else {
        setBranchResponseMsg(message);
      }
    },
    onError: (error) => {
      setBranchResponseMsg(error.message);
    },
  });

  const branchMembersMutation = useMutation({
    mutationFn: BranchServices.getBranchMembers,
    onSuccess: (response) => {
      const responseCode = response.responseCode;
      const message = response.message;
      if (responseCode == 0) {
        setMembers(response.data);
      } else {
        setMemberResponseMsg(message);
      }
    },
    onError: (error) => {
      setMemberResponseMsg(error.message);
    },
  });

  useEffect(() => {
    if (!branchId) return;
    void (async () => {
      await branchMutation.mutateAsync(branchId);
      await branchMembersMutation.mutateAsync(branchId);
    })();
  }, [branchId]);

  if (branchResponseMsg) {
    return (
      <NotFound
        isContent={true}
        title="Branch Details Error"
        message={branchResponseMsg}
      />
    );
  }

  return (
    <AppContentContainer className="mt-3">
      <AppContentHeader>
        <div className="flex flex-col">
          <span className="text-sm font-bold">{branch?.name}</span>
          <div className="flex text-slate-700">
            <LuMapPinHouse />
            <span className="text-xs">{branch?.location?.name}</span>
          </div>
        </div>
        <Can permissions={[AUTH_PERMISSIONS.BRANCH_CHANGE]}>
          <AppButton
            size="xs"
            variant="secondary"
            className="size-8"
            onClick={() => {
              navigate(ROUTE_PATHS.organisation.branches.onboard);
            }}
          >
            <LuPen size={20} />
          </AppButton>
        </Can>
      </AppContentHeader>
      <AppContentBody className="mt-3">
        <div className="flex flex-wrap sm:flex-row gap-3 mb-5">
          <LeaderContainer leader={branch?.leader} />
          <LeaderContainer leader={branch?.assistant_leader} />
        </div>
        <TableWrapper
          error={
            memberResponseMsg && (members.length ?? 0) === 0
              ? {
                  title: "No Members",
                  message: memberResponseMsg,
                }
              : undefined
          }
        >
          <TableCaption>
            <span className="font-bold me-1">Members:</span>
            <span className="text-xs">{branch?.total_members}</span>
          </TableCaption>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S/N</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>
                  <Can permissions={[AUTH_PERMISSIONS.MEMBER_VIEW]}>Action</Can>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {branchMembersMutation.isPending ? (
                <LoadingTableBody columns={6} />
              ) : (
                members?.map((member, index) => {
                  const fullName = getFullName({
                    first_name: member.first_name,
                    middle_name: member.middle_name,
                    last_name: member.last_name,
                  });
                  return (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{fullName}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.phone}</TableCell>
                      <TableCell>{member.residence?.name}</TableCell>
                      <TableCell>
                        <Can permissions={[AUTH_PERMISSIONS.MEMBER_VIEW]}>
                          <Link
                            to={ROUTE_PATHS.membership.members.preview(
                              member.member_id,
                            )}
                          >
                            <LuEye
                              size={20}
                              className="text-slate-400 cursor-pointer"
                            />
                          </Link>
                        </Can>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableWrapper>
      </AppContentBody>
    </AppContentContainer>
  );
}

function LeaderContainer({ leader }: { leader?: BranchLeader }) {
  return (
    <div className="w-full sm:flex-1 flex flex-col border border-slate-300 px-3 pt-3 rounded-md">
      <div className="flex text-slate-700 pb-3 border-b border-b-slate-300">
        <LuCircleUser />
        <div className="flex flex-col">
          <span className="font-bold text-sm">{leader?.title?.title}</span>
          <span className="text-sm">{leader?.full_name}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 my-2 gap-1">
        <div className="flex py-3 text-slate-700 gap-1  border-r border-r-slate-300">
          <LuPhone size={18} />
          <div className="flex flex-col">
            <span className="font-bold text-sm">Phone</span>
            <span className="text-xs">{leader?.phone}</span>
          </div>
        </div>
        <div className="flex py-3 text-slate-700 gap-1">
          <LuMail size={18} />
          <div className="flex flex-col">
            <span className="font-bold text-sm">Email</span>
            <span className="text-xs">{leader?.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
