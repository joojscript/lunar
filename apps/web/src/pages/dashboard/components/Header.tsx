import PowerIcon from "@assets/icons/Power";
import { AuthStore } from "@stores/auth.store";
import { DashboardStore } from "@stores/dashboard.store";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { Icon } from "./Icon";
import { IconButton } from "./IconButton";

export const Header: React.FC = () => {
  const { userInfo } = AuthStore.get();
  const onSidebarHide = useCallback(() => {
    const currentValue = DashboardStore.get();
    DashboardStore.set({
      ...currentValue,
      showSidebar: !currentValue.showSidebar,
    });
  }, [DashboardStore]);

  const logout = useCallback(() => {
    const current = AuthStore.get();
    delete current.access_token;
    AuthStore.set(current);
    window.location.href = "/sign";
    toast("You have been logged out");
  }, [AuthStore]);

  const getGreetingMessage = () => {
    if (userInfo) {
      if (userInfo.firstName && userInfo.lastName) {
        return `Olá, ${userInfo.firstName} ${userInfo.lastName}`;
      } else {
        return `Olá, ${userInfo.email}!`;
      }
    }
    return "Olá, again";
  };

  return (
    <div className="w-full sm:flex p-2 items-end sm:items-center">
      <div className="sm:flex-grow flex justify-between">
        <div className="">
          <div className="flex items-center">
            <div className="text-3xl font-bold text-white">
              {getGreetingMessage()}
            </div>
            <div className="flex items-center p-2 bg-card ml-2 rounded-xl">
              <Icon path="res-react-dash-premium-star" />

              <div className="ml-2 font-bold text-premium-yellow text-yellow-400">
                PREMIUM
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <Icon path="res-react-dash-date-indicator" className="w-3 h-3" />
            <div className="ml-2 text-white">{new Date().toUTCString()}</div>
          </div>
        </div>
        <IconButton
          icon="res-react-dash-sidebar-open"
          className="block sm:hidden"
          onClick={onSidebarHide}
        />
      </div>
      <div className="w-full sm:w-56 mt-4 sm:mt-0 flex justify-end items-center ml-3">
        <Icon
          path="res-react-dash-search"
          className="w-5 h-5 search-icon left-3 absolute"
        />
        <div
          className="cursor-pointer hover:bg-gray-500 hover:bg-opacity-5"
          onClick={logout}
        >
          <PowerIcon className="fill-gray-500 h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default Header;
