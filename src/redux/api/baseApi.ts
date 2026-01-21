import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    const isUnauthorized =
      result.error?.status === 401 ||
      ((result.data as any)?.success === false &&
        (result.data as any)?.message
          ?.toLowerCase()
          .includes("session expired"));

    if (isUnauthorized) {
      api.dispatch(logout());
      localStorage.removeItem("token");
    }
    return result;
  },
  tagTypes: ["User", "Notification", "Message", "Case"],
  endpoints: () => ({}),
});
