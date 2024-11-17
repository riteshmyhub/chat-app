import { requestFcmToken } from "@/utils";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
   loading: {
      getFcmToken: true,
   },
   fcmToken: null as null | string,
};

class FirebaseService {
   getFcmToken = {
      api: createAsyncThunk("getFcmToken*", async (_) => {
         const token = await requestFcmToken();
         return token;
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.loading.getFcmToken = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            console.log(action.payload);

            state.loading.getFcmToken = false;
            state.fcmToken = action.payload;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.loading.getFcmToken = false;
            state.fcmToken = null;
         });
      },
   };

   private slice = createSlice({
      name: "FirebaseService",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
         this.getFcmToken.reducer(builder);
      },
   });

   actions = this.slice.actions;
   reducer = this.slice.reducer;
}
export const firebaseService = new FirebaseService();
export const firebaseActions = firebaseService.actions;
export const firebaseReducer = firebaseService.reducer;
