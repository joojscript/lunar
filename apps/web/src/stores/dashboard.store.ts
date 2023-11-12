import localforage from "localforage";
import { map } from "nanostores";
import type { HostType, ScanType } from "src/globals/types";

type LatestDashboardDataType = {
  data: {
    scansData: Array<ScanType>;
    hostsData: Array<HostType>;
  };
  lastFetch: Date;
};

type DashboardStoreType = {
  showSidebar: boolean;
  latestData?: LatestDashboardDataType;
};

const initialState: DashboardStoreType = (await localforage.getItem(
  "DashboardStore"
)) || {
  showSidebar: false,
};

export const DashboardStore = map<DashboardStoreType>(initialState);
