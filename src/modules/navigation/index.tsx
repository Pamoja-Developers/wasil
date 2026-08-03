import type { NavigationGroup } from "./types";
import { ROUTE_PATHS } from "../router/route.paths";
import {
  LuBookOpenText,
  LuBriefcaseConveyorBelt,
  LuBuilding2,
  LuLayoutDashboard,
  LuMapPinHouse,
  LuUniversity,
  LuUsers,
  LuWallet,
} from "react-icons/lu";
import { TbUserScreen, TbDeviceTabletCog } from "react-icons/tb";
import { LiaUserShieldSolid } from "react-icons/lia";
import { FaBuildingUser, FaUsersGear } from "react-icons/fa6";

import { PiMoneyWavy } from "react-icons/pi";
import { AUTH_PERMISSIONS } from "../auth/types/permissions";
import { AUTH_ROLES } from "../auth/types/roles";

export const navGroups: NavigationGroup[] = [
  {
    label: "Overview",
    items: [
      {
        title: "Dashboard",
        icon: LuLayoutDashboard,
        path: ROUTE_PATHS.dashboard.root,
        isAvailable: false,
      },
    ],
  },
  {
    label: "Organization",
    items: [
      {
        title: "Organization",
        icon: LuBuilding2,
        path: ROUTE_PATHS.organisation.root,
        isAvailable: false,
      },
      {
        title: "Leadership",
        icon: LuBriefcaseConveyorBelt,
        path: ROUTE_PATHS.organisation.leadership.root,
      },
      {
        title: "Branches",
        icon: LuUniversity,
        path: ROUTE_PATHS.organisation.branches.root,
        permissions: [AUTH_PERMISSIONS.BRANCH_VIEW],
      },
      {
        title: "My Branch",
        icon: FaBuildingUser,
        path: ROUTE_PATHS.organisation.myBranch.preview,
      },
    ],
  },
  {
    label: "Membership",
    items: [
      {
        title: "Members",
        icon: LuUsers,
        path: ROUTE_PATHS.membership.members.root,
        permissions: [AUTH_PERMISSIONS.MEMBER_VIEW],
      },
      {
        title: "My Membership",
        icon: TbUserScreen,
        path: ROUTE_PATHS.membership.myMembership.preview,
      },
    ],
  },
  {
    label: "Finance",
    items: [
      {
        title: "Finance",
        icon: LuWallet,
        path: ROUTE_PATHS.finance.root,
        permissions: [AUTH_PERMISSIONS.ACCOUNT_VIEW],
        isAvailable: false,
      },
      {
        title: "Contribution",
        icon: PiMoneyWavy,
        path: ROUTE_PATHS.finance.contribution,
        isAvailable: true,
      },
      {
        title: "Configs",
        icon: TbDeviceTabletCog,
        path: ROUTE_PATHS.finance.configs,
        permissions: [AUTH_PERMISSIONS.ACCOUNT_VIEW],
        isAvailable: true,
      },
    ],
  },
  {
    label: "Users",
    roles: [AUTH_ROLES.SUPER_ADMIN],
    items: [
      {
        title: "Roles",
        icon: LiaUserShieldSolid,
        path: ROUTE_PATHS.users.roles.root,
        roles: [AUTH_ROLES.SUPER_ADMIN],
      },
      {
        title: "Users",
        icon: FaUsersGear,
        path: ROUTE_PATHS.users.users.root,
        roles: [AUTH_ROLES.SUPER_ADMIN],
        isAvailable: false,
      },
    ],
  },
  {
    label: "Configs",
    roles: [AUTH_ROLES.SUPER_ADMIN],
    items: [
      {
        title: "Locations",
        icon: LuMapPinHouse,
        path: ROUTE_PATHS.configs.locations.root,
        roles: [AUTH_ROLES.SUPER_ADMIN],
      },
      {
        title: "Education",
        icon: LuBookOpenText,
        path: ROUTE_PATHS.configs.education.root,
        roles: [AUTH_ROLES.SUPER_ADMIN],
      },
    ],
  },
];
