import { useTab } from "../context/tabbar.provider";
import { AppContentContainer, AppContentHeader } from "./app.content.container";

export default function TabView() {
  const { activeTab } = useTab();

  return (
    <AppContentContainer className="flex-1">
      <AppContentHeader title={activeTab.label} actions={activeTab.actions} />
      <div>{activeTab.section}</div>
    </AppContentContainer>
  );
}
