import React, { createContext, useContext, useState } from "react";
import type { TabItem } from "../types/tab";

type TabContextType = {
  tabs: TabItem[];
  activeTab: TabItem;
  setActiveTab: (tab: TabItem) => void;
};

const TabContext = createContext<TabContextType | null>(null);

export function TabProvider({
  defaultTab,
  children,
  tabs,
}: {
  tabs: TabItem[];
  defaultTab: TabItem;
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  //   const [tabs, setTabs] = useState<TabItem[]>(tabs);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab, tabs }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTab() {
  const context = useContext(TabContext);

  if (!context) {
    throw new Error("useTab must be used inside TabProvider");
  }

  return context;
}
