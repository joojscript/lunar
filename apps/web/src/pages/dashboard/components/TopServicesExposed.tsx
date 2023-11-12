import { Icons } from "@components/icons";
import { DashboardStore } from "@stores/dashboard.store";
import { groupBy, sortBy } from "lodash";
import type { ScanType } from "src/globals/types";

type FormattedDataType = {
  service: string;
  appearances: number;
  info: Array<ScanType>;
};

export const TopServicesExposed: React.FC<{}> = () => {
  const { latestData } = DashboardStore.get();
  const data = latestData?.data.scansData;
  const groupedData = groupBy(data, "service");
  const formattedData = Object.entries(groupedData).map<FormattedDataType>(
    ([service, appearances]) => ({
      service,
      appearances: appearances.length,
      info: appearances,
    })
  );
  const formattedAndSortedData = sortBy(formattedData, "appearances").reverse();

  return (
    <div className="flex p-4 flex-col h-full">
      <div className="flex justify-between items-center">
        <Icons.Services className="h-4 w-4" />
        <div className="text-white font-bold">Top Services Exposed</div>
      </div>
      <div className="overflow-scroll mt-4">
        <table className="box-border w-full h-full">
          <tr className="text-left text-white">
            <th>Service</th>
            <th>Port</th>
            <th>Appearences</th>
          </tr>
          {formattedAndSortedData &&
            formattedAndSortedData.map(({ appearances, info, service }) => {
              const openPorts = info.map((i) => i.port).join(", ");

              return (
                <tr key={info[0].id}>
                  <td className="text-white">{service}</td>
                  <td className="text-gray-400">{openPorts}</td>
                  <td className="text-red-400">{appearances}</td>
                </tr>
              );
            })}
        </table>
      </div>
    </div>
  );
};
