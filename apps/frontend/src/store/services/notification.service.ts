import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import HttpInterceptor from "../interceptors/http.interceptor";
import { INotification } from "@/types/notification.type";
import ENDPOINTS from "../endpoints/endpoints";
import { getToken } from "firebase/messaging";
import { messaging } from "@/utils/firebase/config.firebase";

const initialState = {
   loadings: {
      getDeviceToken: true,
      getNotifications: true,
      deleteNotification: false,
   },
   notifications: [] as INotification[],
   deviceToken: null as string | null,
};

class NotificationService extends HttpInterceptor {
   getDeviceToken = {
      api: createAsyncThunk("getDeviceToken*", async (_, thunkAPI) => {
         try {
            const permission = await Notification.requestPermission();
            if (permission !== "granted") {
               throw new Error("Permission not granted");
            }
            const vapidKey = "BPSK7k9CTrLfDOLaPF4XY4KfegsaX0S_AT4btgpesXWbhLLK7yVZ4I8Ht4waE8kCWjSKZai-SL-i7zOLQ-aIduc";
            const fcmToken = await getToken(messaging, { vapidKey: vapidKey });
            return { data: { fcmToken } };
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.loadings.getDeviceToken = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.loadings.getDeviceToken = false;
            state.deviceToken = action.payload?.data.fcmToken;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.loadings.getDeviceToken = false;
         });
      },
   };

   getNotifications = {
      api: createAsyncThunk("getNotifications*", async (_) => {
         return (await this.http.get(ENDPOINTS.USER.GET_NOTIFICATIONS)).data;
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.loadings.getNotifications = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.loadings.getNotifications = false;
            state.notifications = action.payload?.data.notifications;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.loadings.getNotifications = false;
         });
      },
   };

   deleteNotification = {
      api: createAsyncThunk("deleteNotification", async (paylaod: { notificationId?: string; all?: boolean }, thunkAPI) => {
         try {
            const { data } = await this.http.delete(ENDPOINTS.USER.DELETE_NOTIFICATIONS, {
               params: paylaod,
            });
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.loadings.deleteNotification = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.loadings.deleteNotification = false;
            state.notifications = action.payload?.data.notifications;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.loadings.deleteNotification = false;
         });
      },
   };

   private slice = createSlice({
      name: "NotificationService",
      initialState,
      reducers: {
         setINotification(state, action: PayloadAction<INotification>) {
            state.notifications = [action.payload, ...state.notifications];
         },
      },
      extraReducers: (builder) => {
         this.getNotifications.reducer(builder);
         this.deleteNotification.reducer(builder);
         this.getDeviceToken.reducer(builder);
      },
   });
   actions = this.slice.actions;
   reducer = this.slice.reducer;
}

export const notificationService = new NotificationService();
export const notificationAction = notificationService.actions;
export const notificationReducer = notificationService.reducer;
