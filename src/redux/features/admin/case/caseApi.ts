import { baseApi } from "@/redux/api/baseApi";

const caseAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCase: build.mutation<any, FormData>({
      query: (data) => ({
        url: `/cases/manageCase`,
        method: "POST",
        body: data,
      }),
    }),
    updateCaseStatus: build.mutation<any, string>({
      query: (id) => ({
        url: `/cases/manageCase/${id}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const { useCreateCaseMutation, useUpdateCaseStatusMutation } = caseAPI;
