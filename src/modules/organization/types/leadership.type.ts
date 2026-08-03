import type { SelectOption } from "../../../shared/components/form/fields/app.select.field";
import type { Member } from "../../members/types/member.type";

export const LEADERSHIP_CATEGORY = {
  HQ: 1,
  BRANCH: 2,
  DISTRICT: 3,
  WARD: 4,
  STREET: 5,
};

export const LEADERSHIP_TYPE = {
  AMIR: 1,
  ASSISTANT: 2,
  FINANCE_MANAGER: 3,
};

interface Station {
  station_id: string;
  name: string;
}

export interface Leadership {
  leadership_id: string;
  title: string;
  level: "HQ" | "Branch" | "District" | "Ward" | "Street";
  category: "Leader" | "Assistant";
}

export interface Leader {
  leader_id: string;
  member: Member;
  leadership: Leadership;
  type: number;
  station: Station;
}

export interface BranchLeader {
  full_name: string;
  member_id: string;
  phone: string;
  email: string;
  gender: string;
  dob: string;
  title: Leadership;
}

export const leadershipTypes: SelectOption[] = [
  { label: "AMIR", value: `${LEADERSHIP_TYPE.AMIR}` },
  { label: "ASSISTANT", value: `${LEADERSHIP_TYPE.ASSISTANT}` },
  { label: "FINANCE MANAGER", value: `${LEADERSHIP_TYPE.FINANCE_MANAGER}` },
];

export function getLeaderTypeName(type: number) {
  return type === LEADERSHIP_TYPE.AMIR
    ? "AMIR"
    : type === LEADERSHIP_TYPE.ASSISTANT
      ? "ASSISTANT"
      : "FINANCE MANAGER";
}
