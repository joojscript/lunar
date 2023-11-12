import { Icons } from "@components/icons";
import { DashboardStore } from "@stores/dashboard.store";

export const TopServicesExposed: React.FC<{}> = () => {
  const { latestData } = DashboardStore.get();
  const data = latestData?.data;

  return (
    <div className="flex p-4 flex-col h-full">
      <div className="flex justify-between items-center">
        <Icons.Services className="h-4 w-4" />
        <div className="text-white font-bold">Top Services Exposed</div>
      </div>
      <div className="overflow-scroll">
        <table className="box-border w-full">
          <tr className="text-left text-white">
            <th>Service</th>
            <th>Port</th>
            <th>Status</th>
          </tr>
          {data &&
            data.map(({ id, port, protocol, service, state }) => (
              <tr key={id}>
                <td className="text-gray-400">{service}</td>
                <td className="text-white">{port}</td>
                <td
                  className={`
                    w-2
                    ${state == "open" ? "text-red-400" : "text-green-400"}
                    `}
                >
                  {state}
                </td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
};
