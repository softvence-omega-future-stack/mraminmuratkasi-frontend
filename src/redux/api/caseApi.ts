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
    addAssetToCase: builder.mutation({
      query: (data) => ({
        url: "/cases/addAssetToCase",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Case"],
    }),
  }),
});

export const { useGetCaseDetailsQuery, useAddAssetToCaseMutation } = caseApi;
