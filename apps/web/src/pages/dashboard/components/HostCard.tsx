import { Icons } from "@components/icons";
import { animated, useSpring } from "@react-spring/web";
import Avvvatars from "avvvatars-react";
import type { HostType } from "src/globals/types";
import { Icon } from "./Icon";

type Props = HostType & React.HTMLAttributes<HTMLDivElement>;

export const HostCard: React.FC<Props> = ({
  id,
  hostname,
  label,
  updatedAt,
  verifiedAt,
  createdAt,
  scans,
}) => {
  const { transactions } = useSpring({
    transactions: scans?.length ?? 0,
    barPlayhead: 1,
    from: { transactions: 0, barPlayhead: 0 },
  });

  return (
    <div className="w-full h-full p-2">
      <div className="rounded-lg bg-card flex justify-between p-3 h-32">
        <div className="">
          <div className="flex items-center">
            <Avvvatars value={id} />
            <div className="ml-2">
              <div className="flex items-center">
                <div className="mr-2 font-bold text-white">{hostname}</div>
                <Icon path="res-react-dash-tick" />
              </div>
              <div className="text-sm text-white">
                {new Date(createdAt).toUTCString()}
              </div>
            </div>
          </div>

          <div className="text-sm text-white mt-2">{`${scans?.length} serviços expostos recentemente`}</div>
          <svg
            className="w-44 mt-3"
            height="6"
            viewBox="0 0 200 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="200" height="6" rx="3" fill="#2D2D2D" />
            <animated.rect
              width={((scans?.length ?? 0) / 5) * 200}
              height="6"
              rx="3"
              fill="url(#paint0_linear)"
            />
            <rect x="38" width="2" height="6" fill="#171717" />
            <rect x="78" width="2" height="6" fill="#171717" />
            <rect x="118" width="2" height="6" fill="#171717" />
            <rect x="158" width="2" height="6" fill="#171717" />
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#8E76EF" />
                <stop offset="1" stopColor="#3912D2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="flex flex-col items-center">
          <Icon
            path={
              scans?.length ?? 0 ? "res-react-dash-bull" : "res-react-dash-bear"
            }
            className="w-8 h-8 invisible"
          />
          <animated.div
            className={`${
              (scans?.length ?? 0) <= 10 ? "text-green-500" : "text-red-500"
            } font-bold text-lg`}
          >
            {scans?.length ?? 0}
          </animated.div>
          <div className="text-sm text-white">Serviços expostos</div>
        </div>
      </div>
    </div>
  );
};

export const EmptyHostCard = () => {
  const onClick = () => {
    window.location.href = "/dashboard/hosts/create";
  };

  return (
    <div
      className="w-full h-full p-2 cursor-pointer flex justify-center items=-center"
      onClick={onClick}
    >
      <div className="rounded-lg bg-card flex flex-col items-center justify-between p-3 h-32">
        <Icons.Plus className="w-10 h-10 fill-white" />
        <div className="text-white text-center">
          Click here to add more hosts so you can see them here
        </div>
      </div>
    </div>
  );
};
