export const AUTH_PERMISSIONS = {
  // ROLE PERMISSIONS
  ROLE_ADD: "add_role",
  ROLE_CHANGE: "change_role",
  ROLE_DELETE: "delete_role",
  ROLE_VIEW: "view_role",

  // USER PERMISSIONS
  USER_ADD: "add_user",
  USER_CHANGE: "change_user",
  USER_DELETE: "delete_user",
  USER_VIEW: "view_user",

  // PERMISSION PERMISSIONS
  PERMISSION_ADD: "add_permission",
  PERMISSION_CHANGE: "change_permission",
  PERMISSION_DELETE: "delete_permission",
  PERMISSION_VIEW: "view_permission",

  // DISTRICT PERMISSIONS
  DISTRICT_ADD: "add_district",
  DISTRICT_CHANGE: "change_district",
  DISTRICT_DELETE: "delete_district",
  DISTRICT_VIEW: "view_district",

  // EDUCATION_LEVEL PERMISSIONS
  EDUCATION_LEVEL_ADD: "add_educationlevel",
  EDUCATION_LEVEL_CHANGE: "change_educationlevel",
  EDUCATION_LEVEL_DELETE: "delete_educationlevel",
  EDUCATION_LEVEL_VIEW: "view_educationlevel",

  // REGION PERMISSIONS
  REGION_ADD: "add_region",
  REGION_CHANGE: "change_region",
  REGION_DELETE: "delete_region",
  REGION_VIEW: "view_region",

  // STREET PERMISSIONS
  STREET_ADD: "add_street",
  STREET_CHANGE: "change_street",
  STREET_DELETE: "delete_street",
  STREET_VIEW: "view_street",

  // WARD PERMISSIONS
  WARD_ADD: "add_ward",
  WARD_CHANGE: "change_ward",
  WARD_DELETE: "delete_ward",
  WARD_VIEW: "view_ward",

  // MEMBER PERMISSIONS
  MEMBER_ADD: "add_member",
  MEMBER_CHANGE: "change_member",
  MEMBER_DELETE: "delete_member",
  MEMBER_VIEW: "view_member",

  // BRANCH PERMISSIONS
  BRANCH_ADD: "add_branch",
  BRANCH_CHANGE: "change_branch",
  BRANCH_DELETE: "delete_branch",
  BRANCH_VIEW: "view_branch",

  // LEADER PERMISSIONS
  LEADER_ADD: "add_leader",
  LEADER_CHANGE: "change_leader",
  LEADER_DELETE: "delete_leader",
  LEADER_VIEW: "view_leader",

  // LEADERSHIP PERMISSIONS
  LEADERSHIP_ADD: "add_leadership",
  LEADERSHIP_CHANGE: "change_leadership",
  LEADERSHIP_DELETE: "delete_leadership",
  LEADERSHIP_VIEW: "view_leadership",

  // FINANCIAL ACOOUNT PERMISSIONS
  ACCOUNT_ADD: "add_financialaccount",
  ACCOUNT_CHANGE: "change_financialaccount",
  ACCOUNT_DELETE: "delete_financialaccount",
  ACCOUNT_VIEW: "view_financialaccount",

  // FINANCIAL ACOOUNT PERMISSIONS
  CONTRIBUTION_TYPE_ADD: "add_contributiontype",
  CONTRIBUTION_TYPE_CHANGE: "change_contributiontype",
  CONTRIBUTION_TYPE_DELETE: "delete_contributiontype",
  CONTRIBUTION_TYPE_VIEW: "view_contributiontype",

  // // LEDGER PERMISSIONS
  // LEDGER_ADD: "add_financialaccount",
  // LEDGER_CHANGE: "change_financialaccount",
  // LEDGER_DELETE: "delete_financialaccount",
  // LEDGER_VIEW: "view_financialaccount",

  // // WALLET PERMISSIONS
  // WALLET_ADD: "add_financialaccount",
  // WALLET_CHANGE: "change_financialaccount",
  // WALLET_DELETE: "delete_financialaccount",
  // WALLET_VIEW: "view_financialaccount",
};

export type AuthPermission =
  (typeof AUTH_PERMISSIONS)[keyof typeof AUTH_PERMISSIONS];
