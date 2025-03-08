import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import HttpInterceptor from "../interceptors/http.interceptor";
import { IAuthUser } from "../types/auth-user.type";
import ENDPOINTS from "../endpoint/endpoint";
import { firebase } from "../firebase/firebase";

const initialState = {
   accessToken: localStorage.getItem("accessToken") || null,
   deviceToken: {
      isLoading: true,
      data: null as null | string,
   },
   login: {
      isLoading: false,
   },
   register: {
      isLoading: false,
   },
   session: {
      isLoading: true,
      isUpdating: false,
      data: null as null | IAuthUser,
   },
   logout: {
      isLoading: false,
   },
   updateProfile: {
      isLoading: false,
      data: null,
   },
   updateRingtone: {
      isLoading: false,
      data: null,
   },
};

class AuthService extends HttpInterceptor {
   deviceToken = {
      api: createAsyncThunk("deviceToken*", async (_, thunkAPI) => {
         try {
            const deviceToken = await firebase.getDeviceToken();
            return deviceToken;
         } catch (error) {
            return thunkAPI.rejectWithValue({ message: "device token error" });
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.deviceToken.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.deviceToken.isLoading = false;
            state.deviceToken.data = action.payload;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.deviceToken.isLoading = false;
            state.deviceToken.data = null;
         });
      },
   };

   register = {
      api: createAsyncThunk("register", async (payload: { email: string; password: string; confirmPassword: string }, thunkAPI) => {
         try {
            const deviceToken = (thunkAPI?.getState() as any)?.authReducer?.deviceToken?.data;
            const { data } = await this.http.post(ENDPOINTS.AUTH.REGISTER, payload);
            await thunkAPI.dispatch(this.login.api({ ...payload, deviceToken })).unwrap();
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.register.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.register.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.register.isLoading = false;
         });
      },
   };

   login = {
      api: createAsyncThunk("login", async (param: any, thunkAPI) => {
         try {
            const { data } = await this.http.post(ENDPOINTS.AUTH.LOGIN, param);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.login.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.login.isLoading = false;
            state.accessToken = action.payload?.data?.accessToken;
            localStorage.setItem("accessToken", action.payload?.data?.accessToken);
         });
         builder.addCase(this.api.rejected, (state) => {
            state.login.isLoading = false;
         });
      },
   };

   session = {
      api: createAsyncThunk("session*", async (_, thunkAPI) => {
         try {
            const { data } = await this.http.get(ENDPOINTS.AUTH.GET_SESSION);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.session.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.session.isLoading = false;
            state.session.data = action.payload?.data?.user;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.session.isLoading = false;
            state.session.data = null;
         });
      },
   };

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
            state.session.isUpdating = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.session.isUpdating = false;
            if (state.session.data && action?.payload?.data?.profile) {
               state.session.data.profile = action?.payload?.data?.profile;
            }
         });
         builder.addCase(this.api.rejected, (state) => {
            state.session.isUpdating = false;
         });
      },
   };

   logout = {
      api: createAsyncThunk("logout", async (_, thunkAPI) => {
         try {
            const { data } = await this.http.get(ENDPOINTS.AUTH.LOGOUT);
            await this.clear();
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.logout.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.logout.isLoading = false;
            state.session.data = null;
            state.accessToken = null;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.logout.isLoading = false;
         });
      },
   };

   private slice = createSlice({
      name: "AuthService",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
         this.deviceToken.reducer(builder);
         this.login.reducer(builder);
         this.session.reducer(builder);
         this.updateProfile.reducer(builder);
         this.logout.reducer(builder);
         this.register.reducer(builder);
      },
   });
   public actions = this.slice.actions;
   public reducer = this.slice.reducer;
}

export const authService = new AuthService();
export const authActions = authService.actions;
export const authReducer = authService.reducer;
