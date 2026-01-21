import { baseApi } from "./baseApi";

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChatList: builder.query({
      query: () => ({
        url: "/message/chat-list",
        method: "GET",
      }),
      providesTags: ["Message"],
    }),
    getConversation: builder.query({
      query: (id) => ({
        url: `/message/conversation/${id}`,
        method: "GET",
      }),
      providesTags: ["Message"],
    }),
  }),
});

export const { useGetChatListQuery, useGetConversationQuery } = chatApi;
