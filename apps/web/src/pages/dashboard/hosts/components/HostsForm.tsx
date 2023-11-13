import { LunarLogo } from "@assets/logos/LunarLogo";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { HostType } from "src/globals/types";
import { makeRequest } from "src/services/http";

interface Props {
  action: "EDIT" | "CREATE";
  hostId?: string;
}

const HostsForm: React.FC<Props> = ({ action, hostId }) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<HostType>();

  useEffect(() => {
    if (action === "EDIT") {
      async function loadData() {
        const result = await makeRequest(`/hosts/${hostId}`, { method: "GET" });
        const hostData = await result.json();
        for (const [key, value] of Object.entries(hostData)) {
          console.log(`${key}: ${value}`);
          setValue(key as keyof HostType, value as any);
        }
      }
      loadData();
    }
  }, []);

  const onSubmit = handleSubmit(async (data: HostType) => {
    console.log(errors);
    if (action === "EDIT") {
      try {
        await makeRequest(`/hosts/${hostId}`, {
          method: "PATCH",
          body: JSON.stringify(data),
        });
        toast.success("Host was edited successfully.");
      } catch (error) {
        toast.error("Failed to edit host.");
      }
    }
    if (action === "CREATE") {
      try {
        await makeRequest(`/hosts`, {
          method: "POST",
          body: JSON.stringify(data),
        });
        toast.success("Host was created successfully.");
      } catch (error) {
        toast.error("Failed to create host.");
      }
    }
  });

  const handleGoBack = () => {
    history.back();
  };

  return (
    <section className="bg-customDarkBg2">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-white"
        >
          <LunarLogo class="w-10 h-10 mr-4" />
          Lunar
        </a>
        <div className="w-full bg-customDarkBg1 rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 border-customDarkBg1">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              {action == "CREATE" ? "Create a host" : "Edit host"}
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="hostname"
                  className="block mb-2 text-sm font-medium  text-white"
                >
                  Hostname*
                </label>
                <input
                  className="bg-customDarkBg2 border border-customDarkBg2  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="000.000.0.000"
                  {...register("hostname", {
                    required: true,
                  })}
                />
                {errors.hostname && (
                  <span className="text-red-500 text-xs">
                    This field is required
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="label"
                  className="block mb-2 text-sm font-medium  text-white"
                >
                  Label
                </label>
                <input
                  className="bg-customDarkBg2 border border-customDarkBg2  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="My personal machine"
                  {...register("label")}
                />
                {errors.label && (
                  <span className="text-red-500 text-xs">
                    This field is required
                  </span>
                )}
              </div>

              <div className="w-full flex justify-center items-center">
                <button
                  type="button"
                  className="w-1/2 py-2.5 px-5 me-2 mb-2 text-sm font-medium focus:outline-none rounded-lg border focus:z-10 focus:ring-4 bg-customDarkBg2 text-gray-400 border-customDarkBg1 hover:text-white hover:bg-gray-700"
                  onClick={handleGoBack}
                >
                  Go back
                </button>
                <button
                  type="submit"
                  className="w-1/2 text-white bg-purple-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                >
                  {action == "CREATE" ? "Create" : "Edit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HostsForm;
