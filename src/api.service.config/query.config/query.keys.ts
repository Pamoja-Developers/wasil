export const apiQueryKeys = {
  // EDUCATION KEYS
  educationLevels: ["educationLevels"] as const,
  educationLevel: (levelId: string) => ["educationLevel", levelId] as const,

  regions: ["regions"] as const,
  region: (regionId: string) => ["region", regionId] as const,

  districts: ["districts"] as const,
  district: (districtId: string) => ["district", districtId] as const,

  wards: ["wards"] as const,
  ward: (wardId: string) => ["ward", wardId] as const,

  streets: ["streets"] as const,
  street: (streetId: string) => ["street", streetId] as const,

  roles: ["roles"] as const,
  role: (roleId: string) => ["role", roleId] as const,

  users: ["users"] as const,
  user: (userId: string) => ["user", userId] as const,

  leaders: ["leaders"] as const,
  leader: (leaderId: string) => ["leader", leaderId] as const,

  branches: ["branches"] as const,
  branch: (branchId: string) => ["branch", branchId] as const,

  contributionTypes: ["contribution_types"] as const,
  contributionType: (contributionTypeId: string) =>
    ["contribution_type", contributionTypeId] as const,

  accounts: ["accounts"] as const,
  account: (accountId: string) => ["account", accountId] as const,

  contributions: ["contributions"] as const,
  contribution: (contributionId: string) =>
    ["contribution", contributionId] as const,
};
