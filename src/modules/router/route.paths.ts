import type { UserData } from "../auth/types";

const authBase = "/auth";

const configsBase = "/configs";
const usersBase = "/users";
const rolesBase = `/roles`;
const membersBase = "/members";
const membershipBase = "/membership";

const organisationBase = "/organisation";
const branchBase = `/branches`;
const myBranchBase = "/my-branch";
const leadershipBase = `/leadership`;
const financeBase = `/finance`;
const contributionBase = `/contribution`;

export const ROUTE_PATHS = {
  auth: {
    root: authBase,
    signIn: `${authBase}/sign-in`,
    passwordReset: `${authBase}/reset-password`,
    forgotPassword: `${authBase}/forgot-password`,

    activateAccount: {
      root: `${authBase}/activate-account`,
      activate: (token: string) => `${authBase}/activate-account/${token}`,
    },
  },

  dashboard: {
    root: "/",
    unauthorised: "/unauthorised",
  },

  organisation: {
    root: organisationBase,
    leadership: {
      root: `${leadershipBase}`,
    },
    branches: {
      root: `${branchBase}`,
      preview: (branchId: string) => `${branchBase}/${branchId}`,
      onboard: `${branchBase}/onboard`,
    },
    myBranch: {
      root: myBranchBase,
      preview: (user: UserData) => `${myBranchBase}/${user.branch.branch_id}`,
    },
  },

  membership: {
    members: {
      root: `${membersBase}`,
      register: `${membersBase}/register`,
      preview: (memberId: string) => `${membersBase}/${memberId}`,
    },
    myMembership: {
      root: membershipBase,
      preview: (user: UserData) => `${membershipBase}/${user.member_id}`,
    },
  },

  finance: {
    root: `${financeBase}`,
    contribution: `${contributionBase}`,
    configs: `${financeBase}/configs`,
  },

  users: {
    roles: {
      root: rolesBase,
      preview: (roleId: string) => `${rolesBase}/${roleId}`,
      permissions: { root: `${rolesBase}/permissions` },
    },
    users: {
      root: usersBase,
    },
  },

  configs: {
    locations: {
      root: `${configsBase}/locations`,
    },

    education: {
      root: `${configsBase}/education`,
    },
  },
};
