import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import HttpInterceptor from "../interceptors/http.interceptor";
import ENDPOINTS from "../endpoint/endpoint";
import { IChatDetails } from "../types/chat.type";

const initialState = {
   chatDetails: {
      isLoading: true,
      data: null as IChatDetails | null,
   },
   onlineUsers: [] as string[],
   typing: null as { name: string; avatar: string } | null,
};

class ChatService extends HttpInterceptor {
   getChatDetails = {
      api: createAsyncThunk("getChatDetails*", async (chatID: string, thunkAPI) => {
         try {
            const { data } = await this.http.get(ENDPOINTS.CHAT.GET_CHATS_DETAILS(chatID));
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.chatDetails.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.chatDetails.isLoading = false;
            state.chatDetails.data = action.payload?.data?.details;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.chatDetails.data = null;
            state.chatDetails.isLoading = false;
         });
      },
   };

   private silce = createSlice({
      name: "ChatService",
      initialState: initialState,
      reducers: {
         setOnlineUsers(state, { payload }: PayloadAction<string[]>) {
            state.onlineUsers = payload;
         },
         clearChatDetails(state) {
            state.chatDetails.data = null;
         },
         updateChatDetails(state, action) {
            state.chatDetails.data = {
               ...state.chatDetails.data,
               ...action.payload,
            };
         },
         setTyping(state, { payload }: PayloadAction<{ name: string; avatar: string }>) {
            state.typing = payload;
         },
      },
      extraReducers: (builder) => {
         this.getChatDetails.reducer(builder);
      },
   });
   public chatActions = this.silce.actions;
   public chatReducer = this.silce.reducer;
}

export const chatService = new ChatService();
export const chatActions = chatService.chatActions;
export const chatReducer = chatService.chatReducer;
