import { AuthStore } from "@stores/auth.store";

export const makeRequest = async (path: string, options: RequestInit) => {
  const subPath = path.startsWith("/") ? path.slice(1) : path;
  const token = AuthStore.get().access_token;

  const result = await fetch(
    `${import.meta.env.PUBLIC_SERVER_URL}/${subPath}`,
    {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...options.headers,
        "Content-Type": "application/json",
      },
    }
  );
  if (result.status == 403 || result.status == 401) {
    // Remove authentication, redirect, and re-throw the error:
    AuthStore.set({
      ...AuthStore.get(),
      access_token: undefined,
    });
    window.location.href = "/sign";
  }
  if (result.status < 200 || result.status >= 300) {
    throw new Error(`HTTP error ${result.status}`);
  }
  return result;
};
