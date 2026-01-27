import { baseApi } from "@/redux/api/baseApi";
import { AllCasesResponse } from "./case";
import { AllClient } from "./client";
import { GetCaseDetailsResponse } from "./singleCase";

const clientAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUser: build.query<AllClient, void>({
      query: () => ({
        url: `/users/getAlluser/`,
        method: "GET",
      }),
      providesTags: ["Client"],
    }),
    getAlCases: build.query<AllCasesResponse, void>({
      query: () => ({
        url: `/cases/all-cases/`,
        method: "GET",
      }),
      providesTags: ["AdminCase"],
    }),
    getSingleCases: build.query<GetCaseDetailsResponse, string>({
      query: (id) => ({
        url: `/cases/case/${id}`,
        method: "GET",
      }),
      providesTags: ["AdminCase"],
    }),
    createCase: build.mutation<any, FormData>({
      query: (data) => ({
        url: `/cases/manageCase`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AdminCase"],
    }),

    updateCases: build.mutation<any, { data: any; id: string }>({
      query: ({ data, id }) => ({
        url: `/cases/manageCase/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AdminCase"],
    }),
    blockUser: build.mutation<any, string>({
      query: (id) => ({
        url: `/users/block/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Client", "AdminCase"],
    }),
    unBlockUser: build.mutation<any, string>({
      query: (id) => ({
        url: `/users/unblock/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Client", "AdminCase"],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useGetAlCasesQuery,
  useGetSingleCasesQuery,
  useBlockUserMutation,
  useUnBlockUserMutation,
  useUpdateCasesMutation,
  useCreateCaseMutation,
} = clientAPI;
