import { DashboardStore } from "@stores/dashboard.store";
import React, { useEffect, useState } from "react";
import { makeRequest } from "src/services/http";

const DataLoader: React.FC = () => {
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    async function loadData() {
      const result = await makeRequest("/scans/latest", { method: "GET" });
      const data = await result.json();
      const currentDashboardStoreData = DashboardStore.get();
      const newData = {
        ...currentDashboardStoreData,
        latestData: {
          data,
          lastFetch: new Date(),
        },
      };

      DashboardStore.set(newData);

      if (data.length > 0) setHasData(true);
    }
    loadData();
  }, []);

  return hasData ? (
    <></>
  ) : (
    <div className="flex justify-center items-center w-screen h-screen backdrop-blur-xl">
      <div
        className="w-12 h-12 rounded-full animate-spin
                    border-y-8 border-solid border-purple-500 border-t-transparent"
      />
    </div>
  );
};

export default DataLoader;
