import { baseApi } from "./baseApi";

export const caseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCaseDetails: builder.query({
      query: (id) => ({
        url: `/cases/case/${id}`,
        method: "GET",
      }),
      providesTags: ["Case"],
    }),
  }),
});

export const { useGetCaseDetailsQuery } = caseApi;
