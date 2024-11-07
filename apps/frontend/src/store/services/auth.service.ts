import { IRingtone } from "@/types/notification.type";
import HttpInterceptor from "../interceptors/http.interceptor";
import { IUser } from "@/types/user.type";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ENDPOINTS from "../endpoints/endpoints";

const initialState = {
   loadings: {
      login: false,
      register: false,
      getSession: true,
      logout: false,
      updateProfile: false,
      updateRingtone: false,
      getRingtones: true,
   },
   token: localStorage.getItem("accessToken") || null,
   authUser: null as IUser | null,
   ringtones: [] as IRingtone[],
};

class AuthService extends HttpInterceptor {
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
            const { data } = await this.http.post(ENDPOINTS.AUTH.LOGIN, payload);
            thunkAPI.dispatch(this.getSession.api());
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.loadings.login = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.loadings.login = false;
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
         });
         builder.addCase(this.api.rejected, (state) => {
            state.loadings.getSession = false;
            state.authUser = null;
         });
      },
   };

   logout = {
      api: createAsyncThunk("logout", async (_, thunkAPI) => {
         try {
            return (await this.http.get(ENDPOINTS.AUTH.LOGOUT)).data;
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
      reducers: {},
      extraReducers: (builder) => {
         this.login.reducer(builder);
         this.getSession.reducer(builder);
         this.logout.reducer(builder);
         this.register.reducer(builder);
      },
   });
   actions = this.slice.actions;
   reducer = this.slice.reducer;
}

export const authService = new AuthService();
export const authAction = authService.actions;
export const authReducer = authService.reducer;
