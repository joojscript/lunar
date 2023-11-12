import { DashboardStore } from "@stores/dashboard.store";

import { EmptyHostCard, HostCard } from "./HostCard";

export const HostsSection: React.FC = () => {
  const { latestData } = DashboardStore.get();
  const data = latestData?.data.hostsData;
  const processedComponents = data?.map((host) => <HostCard {...host} />);

  if (processedComponents?.length == 3) return processedComponents;
  if (processedComponents?.length == 2)
    return (
      <>
        {processedComponents}
        <EmptyHostCard />
      </>
    );
  if (processedComponents?.length == 1) {
    return (
      <>
        {processedComponents}
        <EmptyHostCard />
        <EmptyHostCard />
      </>
    );
  }
};

export default HostsSection;
