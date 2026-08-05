import { useParams } from "react-router-dom";
import { type MemberInfo } from "../types/member.type";
import NotFound from "../../../shared/components/not-found";
import { setPageHeader } from "../../../utils/general_hooks";
import {
  AppContentBody,
  AppContentContainer,
  AppContentHeader,
} from "../../../shared/components/app.content.container";
import {
  calculateAge,
  convertStringToDate,
  getFullName,
} from "../../../utils/globals";
import { useEffect, useState } from "react";
import MemberBasicInfoSection from "../components/member.basic.info.section";
import MemberContributionSection from "../components/member.contribution.section";
import { LuBanknote, LuMapPinHouse } from "react-icons/lu";
import { useMutation } from "@tanstack/react-query";
import MemberServices from "../services/member.services";
import { LoadingContent } from "../../../shared/components/progress";

export default function MemberPreviewPage() {
  const { memberId } = useParams();

  const [member, setMember] = useState<MemberInfo | null>(null);
  const [memberResponseMsg, setMemberResponseMsg] = useState<string | null>(
    null,
  );

  const tabs = [
    {
      title: "Basic",
      component: <MemberBasicInfoSection member={member} />,
    },
    {
      title: "Contribution",
      component: <MemberContributionSection member={member} />,
    },
  ];
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  setPageHeader("Member Preview", "Back To Members");

  const memberMutation = useMutation({
    mutationFn: MemberServices.getMemberDetails,
    onSuccess: (response) => {
      const responseCode = response.responseCode;
      const message = response.message;
      if (responseCode == 0) {
        setMember(response.data);
        setCurrentTab(tabs[0]);
      } else {
        setMemberResponseMsg(message);
      }
    },
    onError: (error) => {
      setMemberResponseMsg(error.message);
    },
  });

  useEffect(() => {
    if (!memberId) return;
    void (async () => {
      await memberMutation.mutateAsync(memberId);
    })();
  }, [memberId]);
  if (memberMutation.isPending) {
    return <LoadingContent />;
  } else if (memberResponseMsg || member == null) {
    return (
      <NotFound
        isContent={true}
        title="Error"
        message={
          memberResponseMsg ??
          "Member you are trying to preview is not found, kindly confirm availability"
        }
      />
    );
  }
  return (
    <AppContentContainer>
      <AppContentHeader>
        <div className="flex flex-col">
          <span className="font-bold">
            {getFullName({
              first_name: member.first_name,
              middle_name: member.middle_name,
              last_name: member.last_name,
            })}
          </span>
          <div className="flex gap-2 items-center">
            <span className="w-fit px-3 text-xs rounded-full bg-blue-900 text-white">
              {member.gender}
            </span>
            <span className="text-xs bg-blue-900 text-white px-3 rounded-sm">
              {convertStringToDate(member.dob)} | {calculateAge(member.dob)}{" "}
              years
            </span>
          </div>
        </div>
      </AppContentHeader>
      <AppContentBody>
        <div className="flex flex-wrap gap-5 mb-3">
          <MemberResidence member={member} />
          <MemberContribution />
          <MemberEducation member={member} />
        </div>

        <div className="w-fit flex gap-5 bg-slate-300/30 rounded-full px-2 py-1 mt-3">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`w-32 text-sm text-center rounded-full cursor-pointer
                ${currentTab == tab ? "bg-blue-900 text-blue-400 border border-blue-900" : "border border-slate-300 text-slate-400"}`}
              onClick={() => {
                setCurrentTab(tab);
              }}
            >
              {tab.title}
            </div>
          ))}
        </div>
        <div className="mt-3 w-full">{currentTab.component}</div>
      </AppContentBody>
    </AppContentContainer>
  );
}

function MemberResidence({ member }: { member: MemberInfo }) {
  return (
    <div className="w-full sm:flex-1 flex flex-col border border-slate-300/30 p-2 rounded-sm">
      <div className="flex border-b border-b-slate-300/50">
        <LuMapPinHouse size={18} />
        <span className="text-sm">Residence</span>
      </div>
      <div className="flex gap-3 my-1">
        <div className="flex-1 flex border-b border-b-slate-300/50 p-1 border-r border-r-slate-600/30 gap-2 items-center">
          <span className="text-sm font-bold">Region: </span>
          <span className="text-xs">{member.region?.name}</span>
        </div>
        <div className="flex-1 flex border-b border-b-slate-300/50 gap-2 items-center">
          <span className="text-sm font-bold">District: </span>
          <span className="text-xs">{member.district?.name}</span>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="flex-1 flex border-b border-b-slate-300/50 p-1 border-r border-r-slate-600/30 gap-2 items-center">
          <span className="text-sm font-bold">Ward: </span>
          <span className="text-xs">{member.ward?.name}</span>
        </div>
        <div className="flex-1 flex border-b border-b-slate-300/50 gap-2 items-center">
          <span className="text-sm font-bold">Street: </span>
          <span className="text-xs">{member.residence?.name}</span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-sm font-bold">House No: </span>
        <span className="text-xs">{member.house_no}</span>
      </div>
    </div>
  );
}

function MemberContribution() {
  return (
    <div className="w-full sm:flex-1 flex flex-col border border-slate-300/30 p-2 rounded-sm">
      <div className="flex border-b border-b-slate-300/50">
        <LuBanknote size={18} />
        <span className="text-sm">Contribution</span>
      </div>

      <div className="flex px-2 py-3 border-b border-b-slate-300/50 gap-2 items-center">
        <span className="text-sm font-bold">Total Amount: </span>
        <span className="text-xs">{}</span>
      </div>

      <div className="flex p-2 gap-2 items-center">
        <span className="text-sm font-bold">Total Month(s): </span>
        <span className="text-xs"></span>
      </div>
    </div>
  );
}

function MemberEducation({ member }: { member: MemberInfo }) {
  return (
    <div className="w-full sm:flex-1 flex flex-col border border-slate-300/30 p-2 rounded-sm">
      <div className="flex border-b border-b-slate-300/50">
        <LuBanknote size={18} />
        <span className="text-sm">Education</span>
      </div>

      <div className="flex px-2 py-3 border-b border-b-slate-300/50 gap-2 items-center">
        <span className="text-sm font-bold">Level: </span>
        <span className={`text-sm text-center rounded-full`}>
          {member.edu_level?.name}
        </span>
      </div>

      <div className="flex p-2 gap-2 items-center">
        <span className="text-xs">{member.proffession}</span>
      </div>
    </div>
  );
}
