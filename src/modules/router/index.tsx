import SignInPage from "../auth/pages/signin.page";
import EducationConfigPage from "../configs/pages/education.config.page";
import LocationsConfigPage from "../configs/pages/location.config.page";
import DashboardPage from "../dashboard/pages";
import FinanceMainPage from "../finance/pages";
import ContributionMainPage from "../finance/pages/contribution.page";
import MembersMainPage from "../members/pages";
import MemberPreviewPage from "../members/pages/member.preview";
import MemberRegistrationPage from "../members/pages/member.registration.page";
import AppLayout from "../navigation/components/app.layout";
import type { RouteConfig } from "../navigation/types";
import OrganizationMainPage from "../organization/pages";
import BranchMainPage from "../organization/pages/branches";
import BranchOnboardingPage from "../organization/pages/branches/branch.onboard";
import BranchPreview from "../organization/pages/branches/branch.preview";
import LeadershipMainPage from "../organization/pages/leadership";
import { AppProtectedRoute } from "./components/app.protected.route";
import { AppPublicRoute } from "./components/app.public.route";
import { ROUTE_PATHS } from "./route.paths";
import RolesManagementPage from "../users/pages/roles.management.page";
import UsersManagementPage from "../users/pages/users.management.page";
import RolePreviewPage from "../users/pages/role.preview.page";
import AuthLayout from "../navigation/components/auth.layout";
import ActivateAccountPage from "../auth/pages/activate.account.page";
import RequestPasswordChangePage from "../auth/pages/request.password.change.page";
import ResetPasswordPage from "../auth/pages/reset.password.page";
import Unauthorised from "../navigation/components/unauthorised";
import { AUTH_PERMISSIONS } from "../auth/types/permissions";
import { AUTH_ROLES } from "../auth/types/roles";
import FinanceConfigsPage from "../finance/pages/finance.configs.page";

export const router: RouteConfig[] = [
  {
    title: "Sign In",
    path: ROUTE_PATHS.auth.root,
    element: <AuthLayout />,
    children: [
      {
        title: "Sign In",
        path: ROUTE_PATHS.auth.signIn,
        element: (
          <AppPublicRoute>
            <SignInPage />
          </AppPublicRoute>
        ),
      },
      {
        title: "Activate Account",
        path: `${ROUTE_PATHS.auth.activateAccount.root}/:token`,
        element: <ActivateAccountPage />,
      },
      {
        title: "Forgot Password",
        path: ROUTE_PATHS.auth.forgotPassword,
        element: <RequestPasswordChangePage />,
      },
      {
        title: "Reset Password",
        path: ROUTE_PATHS.auth.passwordReset,
        element: <ResetPasswordPage />,
      },
    ],
  },
  {
    title: "Dashboard",
    path: ROUTE_PATHS.dashboard.root,
    element: (
      <AppProtectedRoute>
        <AppLayout />
      </AppProtectedRoute>
    ),
    children: [
      // Dashboard
      {
        title: "Dashboard",
        path: ROUTE_PATHS.dashboard.root,
        element: <DashboardPage />,
      },

      // Organization
      {
        title: "Organization",
        path: ROUTE_PATHS.organisation.root,
        element: <OrganizationMainPage />,
      },
      {
        title: "Leadership",
        path: ROUTE_PATHS.organisation.leadership.root,
        element: <LeadershipMainPage />,
      },

      // Branches
      {
        title: "Branches",
        path: ROUTE_PATHS.organisation.branches.root,
        element: (
          <AppProtectedRoute permissions={[AUTH_PERMISSIONS.BRANCH_VIEW]}>
            <BranchMainPage />
          </AppProtectedRoute>
        ),
      },

      {
        title: "Preview Branch",
        path: `${ROUTE_PATHS.organisation.branches.root}/:branchId`,
        element: <BranchPreview />,
      },

      {
        title: "My Branch",
        path: `${ROUTE_PATHS.organisation.myBranch.root}/:branchId`,
        element: <BranchPreview />,
      },

      {
        title: "Onboard Branch",
        path: ROUTE_PATHS.organisation.branches.onboard,
        element: (
          <AppProtectedRoute permissions={[AUTH_PERMISSIONS.BRANCH_ADD]}>
            <BranchOnboardingPage />
          </AppProtectedRoute>
        ),
      },

      // Members
      {
        title: "Members",
        path: ROUTE_PATHS.membership.members.root,
        element: (
          <AppProtectedRoute permissions={[AUTH_PERMISSIONS.MEMBER_VIEW]}>
            <MembersMainPage />
          </AppProtectedRoute>
        ),
      },

      {
        title: "Preview Member",
        path: `${ROUTE_PATHS.membership.members.root}/:memberId`,
        element: <MemberPreviewPage />,
      },

      {
        title: "My Membership",
        path: `${ROUTE_PATHS.membership.myMembership.root}/:memberId`,
        element: <MemberPreviewPage />,
      },

      {
        title: "Member Registration",
        path: ROUTE_PATHS.membership.members.register,
        element: (
          <AppProtectedRoute permissions={[AUTH_PERMISSIONS.MEMBER_ADD]}>
            <MemberRegistrationPage />
          </AppProtectedRoute>
        ),
      },

      // Finance
      {
        title: "Finance",
        path: ROUTE_PATHS.finance.root,
        element: (
          <AppProtectedRoute permissions={[AUTH_PERMISSIONS.ACCOUNT_VIEW]}>
            <FinanceMainPage />
          </AppProtectedRoute>
        ),
      },
      {
        title: "Contribution",
        path: ROUTE_PATHS.finance.contribution,
        element: <ContributionMainPage />,
      },
      {
        title: "Finance Configs",
        path: ROUTE_PATHS.finance.configs,
        element: (
          <AppProtectedRoute permissions={[AUTH_PERMISSIONS.ACCOUNT_VIEW]}>
            <FinanceConfigsPage />
          </AppProtectedRoute>
        ),
      },
      // Users
      {
        title: "Roles",
        path: ROUTE_PATHS.users.roles.root,
        element: (
          <AppProtectedRoute roles={[AUTH_ROLES.SUPER_ADMIN]}>
            <RolesManagementPage />
          </AppProtectedRoute>
        ),
      },
      {
        title: "Preview Role",
        path: `${ROUTE_PATHS.users.roles.root}/:roleId`,
        element: (
          <AppProtectedRoute roles={[AUTH_ROLES.SUPER_ADMIN]}>
            <RolePreviewPage />
          </AppProtectedRoute>
        ),
      },
      {
        title: "Users",
        path: ROUTE_PATHS.users.users.root,
        element: (
          <AppProtectedRoute roles={[AUTH_ROLES.SUPER_ADMIN]}>
            <UsersManagementPage />
          </AppProtectedRoute>
        ),
      },

      // Configs
      {
        title: "Locations",
        path: ROUTE_PATHS.configs.locations.root,
        element: (
          <AppProtectedRoute roles={[AUTH_ROLES.SUPER_ADMIN]}>
            <LocationsConfigPage />
          </AppProtectedRoute>
        ),
      },
      {
        title: "Education",
        path: ROUTE_PATHS.configs.education.root,
        element: (
          <AppProtectedRoute roles={[AUTH_ROLES.SUPER_ADMIN]}>
            <EducationConfigPage />
          </AppProtectedRoute>
        ),
      },
      // ERORRS
      {
        title: "Unauthorised",
        path: ROUTE_PATHS.dashboard.unauthorised,
        element: <Unauthorised />,
      },
    ],
  },
];
