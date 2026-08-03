import { useTab } from "../context/tabbar.provider";
import { AppContentContainer } from "./app.content.container";

export default function TabView() {
  const { activeTab } = useTab();

  return (
    <AppContentContainer className="flex-1">
      {activeTab.section}
    </AppContentContainer>
  );
}
