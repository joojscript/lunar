import { DashboardStore } from "@stores/dashboard.store";
import { groupBy } from "lodash";
import { Icon } from "./Icon";

type SegmentationDataType = {
  c1: string;
  c2: string;
  c3: string;
  color: string;
};

const COLORS = ["#363636", "#818bb1", "#2c365d", "#334ed8"];

export const Segmentation = () => {
  const { latestData } = DashboardStore.get();
  const data = latestData?.data;
  const groupedData = groupBy(data, "service");
  const formattedData = Object.entries(groupedData).map<SegmentationDataType>(
    ([service, appearances], index) => ({
      c1: service,
      c2: String(appearances.length),
      c3: COLORS[index],
      color: "#ffffff",
    })
  );

  return (
    <div className="p-4 h-full">
      <div className="flex justify-between items-center">
        <div className="text-white font-bold">Segmentação</div>

        <Icon path="res-react-dash-options" className="w-2 h-2" />
      </div>
      <div className="mt-3 text-white">Todos os hosts</div>
      <div className="overflow-scroll">
        {formattedData.map(({ c1, c2, c3, color }) => (
          <div className="flex items-center" key={c1}>
            <div
              className="w-2 h-2 rounded-full"
              style={{
                background: color,
              }}
            />
            <div className="ml-2" style={{ color }}>
              {c1}
            </div>
            <div className="flex-grow" />
            <div className="" style={{ color }}>
              {c2}
            </div>
            <div className="ml-2 w-12 card-stack-border" />
            <div className="ml-2 h-8">
              <div
                className="w-20 h-28 rounded-lg overflow-hidden"
                style={{
                  background: c3,
                }}
              >
                {c1 === "unknown" && (
                  <img
                    src="https://assets.codepen.io/3685267/res-react-dash-user-card.svg"
                    alt=""
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex mt-3 px-3 items-center justify-between bg-details rounded-xl w-36 h-12">
        <div className="text-white">Details</div>
        <Icon path="res-react-dash-chevron-right" className="w-4 h-4" />
      </div>
    </div>
  );
};
