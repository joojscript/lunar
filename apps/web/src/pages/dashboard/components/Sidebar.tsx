import { LunarLogo } from "@assets/logos/LunarLogo";
import { useStore } from "@nanostores/react";
import { AuthStore } from "@stores/auth.store";
import { DashboardStore } from "@stores/dashboard.store";
import Avvvatars from "avvvatars-react";
import { useCallback, useState } from "react";
import { SidebarItemType, sidebarItems } from "../helpers/data";
import { Icon } from "./Icon";
import { IconButton } from "./IconButton";
import { MenuItem } from "./MenuItem";

export const Sidebar = () => {
  const { showSidebar } = useStore(DashboardStore);
  const { userInfo } = AuthStore.get();
  const [selected, setSelected] = useState("0");

  const onSidebarHide = useCallback(() => {
    const currentValue = DashboardStore.get();
    DashboardStore.set({
      ...currentValue,
      showSidebar: !currentValue.showSidebar,
    });
  }, [DashboardStore]);

  const handleClick = (item: SidebarItemType) => {
    setSelected(item.id);
    window.location.href = item.href ?? "/dashboard";
  };

  return (
    <div
      className={`fixed sm:relative inset-y-0 left-0 bg-card w-full sm:w-20 xl:w-60 sm:flex flex-col z-10 ${
        showSidebar ? "flex" : "hidden"
      }`}
    >
      <div className="flex-shrink-0 overflow-hidden p-2">
        <div className="flex items-center h-full sm:justify-center xl:justify-start p-2 sidebar-separator-top">
          <LunarLogo class="mx-auto" width="3rem" height="3rem" />
          <div className="block sm:hidden xl:block ml-2 font-bold text-xl text-white">
            Lunar
          </div>
          <div className="flex-grow sm:hidden xl:block" />
          <IconButton
            icon="res-react-dash-sidebar-close"
            className="block sm:hidden"
            onClick={onSidebarHide}
          />
        </div>
      </div>
      <div className="flex-grow overflow-x-hidden overflow-y-auto flex flex-col">
        {sidebarItems[0].map((i) => (
          <MenuItem
            key={i.id}
            item={i}
            onClick={() => handleClick(i)}
            selected={selected}
          />
        ))}
        <div className="flex-grow" />
      </div>

      {userInfo && (
        <div className="flex-shrink-0 overflow-hidden p-2">
          <div className="flex items-center h-full sm:justify-center xl:justify-start p-2 sidebar-separator-bottom">
            <Avvvatars value={userInfo.email} />
            <div className="block sm:hidden xl:block text-white ml-2 w-full overflow-clip">
              {userInfo.firstName && userInfo.lastName
                ? `${userInfo.firstName} ${userInfo.lastName}`
                : `${userInfo.email}...`}
            </div>
            <div className="flex-grow block sm:hidden xl:block" />
            <Icon
              path="res-react-dash-options"
              className="block sm:hidden xl:block w-3 h-3"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
