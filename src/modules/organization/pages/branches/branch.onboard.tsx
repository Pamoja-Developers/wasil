import { AppContentContainer } from "../../../../shared/components/app.content.container";
import { setPageHeader } from "../../../../utils/general_hooks";
import BranchOnboardForm from "../../components/forms/branch.onboard.form";
import type { Branch } from "../../types/branch.type";

export default function BranchOnboardingPage({ branch }: { branch?: Branch }) {
  setPageHeader("Branch Onboarding", "Back To Branches");
  if (branch) {
  }
  return (
    <AppContentContainer className="mt-3 w-full sm:w-96">
      <BranchOnboardForm />
    </AppContentContainer>
  );
}
