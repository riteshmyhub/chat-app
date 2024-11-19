import { INotification, IRingtone } from "@/types/notification.type";
import HttpInterceptor from "../interceptors/http.interceptor";
import { IUser } from "@/types/user.type";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import ENDPOINTS from "../endpoints/endpoints";
import { getToken } from "firebase/messaging";
import { messaging } from "@/utils/firebase/config.firebase";

const initialState = {
   loadings: {
      login: false,
      register: false,
      getSession: true,
      logout: false,
      updateProfile: false,
      updateRingtone: false,
      getFcmToken: true,
      getNotifications: true,
   },
   fcmToken: null as string | null,
   accessToken: localStorage.getItem("accessToken") || null,
   authUser: null as IUser | null,
   notifications: [] as INotification[],
   appSettings: null as {
      ringtones: IRingtone[];
   } | null,
};

class AuthService extends HttpInterceptor {
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
   getFcmToken = {
      api: createAsyncThunk("getFcmToken*", async (_, thunkAPI) => {
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
            state.loadings.getFcmToken = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.loadings.getFcmToken = false;
            state.fcmToken = action.payload?.data.fcmToken;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.loadings.getFcmToken = false;
         });
      },
   };

   register = {
      api: createAsyncThunk("register", async (payload: { email: string; password: string; confirmPassword: string }, thunkAPI) => {
         try {
            return (await this.http.post(ENDPOINTS.AUTH.REGISTER, payload)).data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.loadings.register = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.loadings.register = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.loadings.register = false;
         });
      },
   };

   login = {
      api: createAsyncThunk("login", async (payload: any, thunkAPI) => {
         try {
            const fcmToken = (thunkAPI.getState() as any)?.auth?.fcmToken;
            const { data } = await this.http.post(ENDPOINTS.AUTH.LOGIN, { ...payload, fcmToken });
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.loadings.login = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.loadings.login = false;
            const accessToken = action.payload?.data?.accessToken;
            if (accessToken) {
               localStorage.setItem("accessToken", accessToken);
               state.accessToken = accessToken;
            }
         });
         builder.addCase(this.api.rejected, (state) => {
            state.loadings.login = false;
         });
      },
   };

   getSession = {
      api: createAsyncThunk("getSession*", async (_, thunkAPI) => {
         try {
            return (await this.http.get(ENDPOINTS.AUTH.GET_SESSION)).data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.loadings.getSession = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.loadings.getSession = false;
            state.authUser = action.payload?.data?.user;
            state.appSettings = action.payload?.data?.appSettings;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.loadings.getSession = false;
            state.authUser = null;
            state.appSettings = null;
         });
      },
   };

   /*-----------------------updateProfile------------------------*/
   updateProfile = {
      api: createAsyncThunk("updateProfile", async (payload: FormData, thunkAPI) => {
         try {
            return (await this.http.put(ENDPOINTS.USER.CREATE_PROFILE, payload)).data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.loadings.updateProfile = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.loadings.updateProfile = false;
            if (state.authUser && action?.payload?.data?.profile) {
               state.authUser.profile = action?.payload?.data?.profile;
            }
         });
         builder.addCase(this.api.rejected, (state) => {
            state.loadings.updateProfile = false;
         });
      },
   };

   /*-------------------------updateRingtone----------------------*/
   updateRingtone = {
      api: createAsyncThunk("updateRingtone", async (paylaod: FormData, thunkAPI) => {
         try {
            return (await this.http.post(ENDPOINTS.USER.SETTING.CHANGE_RINGTONES, paylaod)).data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.loadings.updateRingtone = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            const ringtone = action.payload?.data?.ringtone;
            state.loadings.updateRingtone = false;
            if (state.authUser?.setting && ringtone) {
               state.authUser.setting.notification_sound = ringtone?.notification_sound;
               state.authUser.setting.send_message_sound = ringtone?.send_message_sound;
               state.authUser.setting.received_message_sound = ringtone?.received_message_sound;
            }
         });
         builder.addCase(this.api.rejected, (state) => {
            state.loadings.updateRingtone = false;
         });
      },
   };
   logout = {
      api: createAsyncThunk("logout", async (_, thunkAPI) => {
         try {
            const { data } = await this.http.get(ENDPOINTS.AUTH.LOGOUT);
            localStorage.removeItem("accessToken");
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.loadings.logout = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.loadings.logout = false;
            state.authUser = null;
            state.accessToken = null;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.loadings.logout = false;
            state.authUser = null;
         });
      },
   };

   private slice = createSlice({
      name: "AuthService",
      initialState: initialState,
      reducers: {
         setINotification(state, action: PayloadAction<INotification>) {
            state.notifications = [action.payload, ...state.notifications];
         },
      },
      extraReducers: (builder) => {
         this.getNotifications.reducer(builder);
         this.login.reducer(builder);
         this.getSession.reducer(builder);
         this.logout.reducer(builder);
         this.register.reducer(builder);
         this.updateProfile.reducer(builder);
         this.updateRingtone.reducer(builder);
         this.getFcmToken.reducer(builder);
      },
   });
   actions = this.slice.actions;
   reducer = this.slice.reducer;
}

export const authService = new AuthService();
export const authAction = authService.actions;
export const authReducer = authService.reducer;
