import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { HostType } from "src/globals/types";
import { makeRequest } from "src/services/http";

export const HostsTable: React.FC = () => {
  const [hostsData, setHostsData] = useState<HostType[]>();

  useEffect(() => {
    async function loadData() {
      const result = await makeRequest("/hosts", { method: "GET" });
      setHostsData(await result.json());
    }
    loadData();
  }, []);

  const handleRedirect = (hostId: string) => {
    window.location.href = `/dashboard/hosts/edit/${hostId}`;
  };

  const handleDelete = async (hostId: string) => {
    try {
      await makeRequest(`/hosts/${hostId}`, { method: "DELETE" });
      toast.success("Host was deleted successfully.");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to delete host.");
    }
  };

  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-400">
      <thead className="text-xs uppercase bg-customDarkBg1 text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            {" "}
            Hostname
          </th>
          <th scope="col" className="px-6 py-3">
            {" "}
            Services Exposed
          </th>
          <th scope="col" className="px-6 py-3">
            {" "}
            Created At
          </th>
          <th scope="col" className="px-6 py-3">
            {" "}
            Last Update
          </th>
          <th scope="col" className="px-6 py-3">
            {" "}
            Verified?
          </th>
          <th scope="col" className="px-6 py-3 col-span-2">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {hostsData &&
          hostsData.map((host) => (
            <tr className="border-b bg-customDarkBg3 border-customDarkBg1  text-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap"
              >
                {host.hostname} {host.label && `(${host.label})`}
              </th>
              <td className="px-6 py-4">
                {host.scans?.filter((i) => i.state === "open").length ??
                  "Not found"}
              </td>
              <td className="px-6 py-4">
                {new Date(host.createdAt).toUTCString()}
              </td>
              <td className="px-6 py-4">
                {new Date(host.updatedAt).toUTCString()}
              </td>
              <td className="px-6 py-4">
                {host.verifiedAt
                  ? `Yes (${new Date(host.verifiedAt).toUTCString()})`
                  : "No"}
              </td>
              <td>
                <div className="flex justify-center items-center">
                  <a
                    onClick={() => handleRedirect(host.id)}
                    className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Edit
                  </a>
                  <div className="w-2" />
                  <a
                    onClick={() => handleDelete(host.id)}
                    className="cursor-pointer text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                  >
                    Delete
                  </a>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default HostsTable;
