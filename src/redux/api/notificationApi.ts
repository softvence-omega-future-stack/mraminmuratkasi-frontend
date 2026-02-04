import { baseApi } from "./baseApi";
import { SendNotificationPayload } from "./notification";

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
    deleteNotificationForAdmin: builder.mutation({
      query: (id) => ({
        url: `/notifications/deleteAnyNotification/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notification"],
    }),
    postNotificationFromAdmin: builder.mutation<any, SendNotificationPayload>({
      query: (data) => ({
        url: `/notifications/sendNotificationFromAdmin`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Notification"],
    }),
    viewSpecificNotification: builder.mutation({
      query: (notification_id) => ({
        url: `/notifications/viewSpecificNotification?notification_id=${notification_id}`,
        method: "GET",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useLazyGetAllNotificationsQuery,
  useGetNotificationForBellQuery,
  useDeleteNotificationMutation,
  useViewSpecificNotificationMutation,
  useDeleteNotificationForAdminMutation,
  usePostNotificationFromAdminMutation,
} = notificationApi;
