import { Link, useNavigate } from "react-router-dom";
import {
  AppIconButton,
  AppSubmitButton,
} from "../../../shared/components/app.button";
import {
  AppContentBody,
  AppContentContainer,
} from "../../../shared/components/app.content.container";

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
import { setPageHeader } from "../../../utils/general_hooks";
import {
  defaultMemberFilterValues,
  memberFilterSchema,
  type MemberFilterFormValues,
} from "../schema/member.filter.schema";
import { type Member } from "../types/member.type";
import { ROUTE_PATHS } from "../../router/route.paths";
import { LuEye, LuPlus } from "react-icons/lu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AppTextField } from "../../../shared/components/form/fields/app.text.field";
import { AppFormProvider } from "../../../shared/components/form";
import { type SelectOption } from "../../../shared/components/form/fields/app.select.field";
import { getFullName } from "../../../utils/globals";
import { useMutation } from "@tanstack/react-query";
import MemberServices from "../services/member.services";
import { useEffect, useState } from "react";
import RegionSelectInput from "../../../shared/components/form/inputs/region.select.input";
import DistrictSelectInput from "../../../shared/components/form/inputs/district.select.input";
import WardSelectInput from "../../../shared/components/form/inputs/ward.select.input";
import StreetSelectInput from "../../../shared/components/form/inputs/street.select.input";
import StatusContainer from "../components/status.container";
import { Can } from "../../auth/components/can";
import { AUTH_PERMISSIONS } from "../../auth/types/permissions";

export default function MembersMainPage() {
  const navigate = useNavigate();
  const [responseMsg, setResponseMsg] = useState<string | null>(null);
  const [members, setMembers] = useState<Member[] | []>([]);
  const [selectedRegion, setSelectedRegion] = useState<SelectOption | null>(
    null,
  );
  const [selectedDistrict, setSelectedDistrict] = useState<SelectOption | null>(
    null,
  );
  const [selectedWard, setSelectedWard] = useState<SelectOption | null>(null);

  const form = useForm<MemberFilterFormValues>({
    resolver: zodResolver(memberFilterSchema),
    defaultValues: defaultMemberFilterValues,
  });

  const membersMutation = useMutation({
    mutationFn: MemberServices.getMembers,
    onSuccess: (response) => {
      const responseCode = response.responseCode;
      const message = response.message;
      if (responseCode == 0) {
        setMembers(response.data);
      } else {
        setResponseMsg(message);
      }
    },
    onError: (error) => {
      setResponseMsg(error.message);
    },
  });

  async function onSubmit(params: MemberFilterFormValues) {
    void (async () => {
      await membersMutation.mutateAsync(params);
    })();
  }

  useEffect(() => {
    void (async () => {
      await membersMutation.mutateAsync(defaultMemberFilterValues);
    })();
  }, []);

  setPageHeader("Members");
  return (
    <AppContentContainer>
      <AppContentBody>
        <AppFormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mb-5 w-full">
            <div className="flex flex-col gap-3">
              <div className="flex-1">
                <AppTextField
                  control={form.control}
                  name="name"
                  placeholder="Member Name"
                />
              </div>
              <div className="grid grid-cols-2 md:flex md:flex-wrap gap-5">
                <div className="flex-1">
                  <RegionSelectInput
                    control={form.control}
                    name="branch"
                    placeholder="Select Region"
                    widthClass="w-full lg:w-xs"
                    onChange={(option) => {
                      if (!option) return null;
                      setSelectedRegion(option);
                    }}
                  />
                </div>
                <div className="flex-1">
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
                </div>
                <div className="flex-1">
                  <WardSelectInput
                    control={form.control}
                    districtId={selectedDistrict?.value ?? ""}
                    name="ward"
                    placeholder="Select Ward"
                    widthClass="w-full lg:w-xs"
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
                    placeholder="Select Street"
                    widthClass="w-full lg:w-xs"
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <AppSubmitButton
                  label="Submit"
                  className="w-96"
                  loading={membersMutation.isPending}
                />
              </div>
            </div>
          </form>
        </AppFormProvider>
        <TableWrapper
          className="flex flex-col"
          error={
            responseMsg && (members.length ?? 0) === 0
              ? {
                  title: "No Members",
                  message: responseMsg,
                }
              : undefined
          }
        >
          <TableCaption className="flex justify-between mb-3">
            <div className="flex items-center">
              <span className="font-bold me-1">Members:</span>
              <span className="text-xs">{members?.length}</span>
            </div>
            <Can permissions={[AUTH_PERMISSIONS.MEMBER_ADD]}>
              <AppIconButton
                Icon={LuPlus}
                onClick={() => {
                  navigate(ROUTE_PATHS.membership.members.register);
                }}
              />
            </Can>
          </TableCaption>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S/N</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Residence</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Account Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {membersMutation.isPending ? (
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
                      <TableCell>{member.residence?.name}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.phone}</TableCell>
                      <TableCell>
                        <StatusContainer status={member.status} />
                      </TableCell>

                      <TableCell>
                        <div className="flex gap-3">
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
                          {/* <LuTrash
                            size={20}
                            className="text-red-400 cursor-pointer"
                          /> */}
                        </div>
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
