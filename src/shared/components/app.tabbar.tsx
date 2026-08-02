import SideLinkItem from "./side.link.item";
import { useTab } from "../context/tabbar.provider";
import { AppContentContainer, AppContentBody } from "./app.content.container";

export default function AppTabbar() {
  const { activeTab, setActiveTab, tabs } = useTab();

  return (
    <AppContentContainer>
      <AppContentBody className="items-center-safe justify-center-safe">
        {tabs.map((tab, _) => (
          <SideLinkItem
            className="min-w-28 text-center lg:w-full"
            key={tab.id}
            text={tab.label}
            isActive={tab == activeTab}
            onClick={() => {
              setActiveTab(tab);
            }}
          />
        ))}
      </AppContentBody>
    </AppContentContainer>
  );
}
