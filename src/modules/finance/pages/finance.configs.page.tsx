import AppTabbar from "../../../shared/components/app.tabbar";
import { TabProvider } from "../../../shared/context/tabbar.provider";
import type { TabItem } from "../../../shared/types/tab";
import FinanceAccountsSection from "../components/finance.accounts.section";
import TabView from "../../../shared/components/app.tabview";
import ContributionTypeSection from "../components/contribution.type.section";

export default function FinanceConfigsPage() {
  const tabs: TabItem[] = [
    {
      id: "accounts",
      label: "Accounts",
      section: <FinanceAccountsSection />,
    },
    {
      id: "contibution_types",
      label: "Contribution Types",
      section: <ContributionTypeSection />,
    },
  ];
  return (
    <div className="flex flex-col lg:flex-row gap-5 mt-3">
      <TabProvider defaultTab={tabs[0]} tabs={tabs}>
        <AppTabbar />
        <TabView />
      </TabProvider>
    </div>
  );
}
