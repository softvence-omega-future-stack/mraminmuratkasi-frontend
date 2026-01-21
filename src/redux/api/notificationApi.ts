import { baseApi } from "./baseApi";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query({
      query: () => ({
        url: "/notifications/getAllNotifications",
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),
    getNotificationForBell: builder.query({
      query: () => ({
        url: "/notifications/getNotificationForNotificationBell",
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),
    deleteNotification: builder.mutation({
      query: (id) => ({
        url: `/notifications/deleteUserNotification/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const { useGetAllNotificationsQuery, useGetNotificationForBellQuery, useDeleteNotificationMutation } = notificationApi;
