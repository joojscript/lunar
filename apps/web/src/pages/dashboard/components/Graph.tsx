import useResizeObserver from "@react-hook/resize-observer";
import { DashboardStore } from "@stores/dashboard.store";
import { groupBy } from "lodash";
import React, { useRef } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Icon } from "./Icon";

const useSize = (target: any) => {
  const [size, setSize] = React.useState<
    Pick<DOMRectReadOnly, "height" | "width">
  >({
    height: 100,
    width: 700,
  });

  React.useLayoutEffect(() => {
    const { width, height } = target.current.getBoundingClientRect();
    setSize({ width: width * 0.2, height: height * 0.2 });
  }, [target]);

  useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
};

type GraphDataType = {
  service: string;
  appearances: number;
  info: Array<Record<string, unknown>>;
};

export const Graph: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const size = useSize(containerRef);
  const { latestData } = DashboardStore.get();
  const data = latestData?.data;
  const groupedData = groupBy(data, "service");
  const formattedData = Object.entries(groupedData).map<GraphDataType>(
    ([service, appearances]) => ({
      service,
      appearances: appearances.length,
      info: appearances,
    })
  );

  const CustomTooltip = () => (
    <div className="rounded-xl overflow-hidden tooltip-head bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <div className="flex items-center justify-between p-2 text-white">
        <div className="">Revenue</div>
        <Icon path="res-react-dash-options" className="w-2 h-2" />
      </div>
      <div className="tooltip-body text-center p-3">
        <div className="text-white font-bold">$1300.50</div>
        <div className="text-white">Revenue from 230 sales</div>
      </div>
    </div>
  );

  return (
    <div className="flex p-4 h-full flex-col">
      <div className="">
        <div className="flex items-center">
          <div className="font-bold text-white">
            Sumário de serviços Expostos Recentemente
          </div>
          <div className="flex-grow" />
        </div>
      </div>

      <div ref={containerRef} className="flex-grow h-full">
        <LineChart width={size.width} height={size.height} data={formattedData}>
          <defs>
            <linearGradient id="paint0_linear" x1="0" y1="0" x2="1" y2="0">
              <stop stopColor="#6B8DE3" />
              <stop offset="1" stopColor="#7D1C8D" />
            </linearGradient>
          </defs>
          <CartesianGrid horizontal={false} strokeWidth="6" stroke="#252525" />
          <XAxis
            dataKey="service"
            axisLine={false}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis axisLine={false} tickLine={false} tickMargin={10} />
          <Line
            type="monotone"
            dataKey="appearances"
            stroke="url(#paint0_linear)"
            strokeWidth="4"
            dot={false}
          />
        </LineChart>
      </div>
    </div>
  );
};
