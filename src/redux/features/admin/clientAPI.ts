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
    }),
    getAlCases: build.query<AllCasesResponse, void>({
      query: () => ({
        url: `/cases/all-cases/`,
        method: "GET",
      }),
    }),
    getSingleCases: build.query<GetCaseDetailsResponse, string>({
      query: (id) => ({
        url: `/cases/case/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useGetAlCasesQuery,
  useGetSingleCasesQuery,
} = clientAPI;
