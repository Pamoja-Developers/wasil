import type React from "react";

export interface TabItem {
  id: string;
  label: string;
  section: React.ReactElement;
}
