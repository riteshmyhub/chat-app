import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import HttpInterceptor from "../interceptors/http.interceptor";
import { IChatDetails, IMessage, IAttachment } from "@/types/chat.type";
import ENDPOINTS from "../endpoints/endpoints";

const initialState = {
   loadings: {
      getMessages: true,
      getChatDetails: true,
   },
   messages: [] as IMessage[],
   unreadMessages: [] as IMessage[],
   onlineUsers: [] as string[],
   typing: "" as string,
   chatDetails: null as IChatDetails | null,
   mediaList: [] as IAttachment[],
};

class ChatService extends HttpInterceptor {
   getMessages = {
      api: createAsyncThunk("getMessages*", async (chatID: string, thunkAPI) => {
         try {
            const { data } = await this.http.get(ENDPOINTS.CHAT.MESSAGES.GET_MESSAGES(chatID));
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.loadings.getMessages = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            const chatID = action.meta.arg;
            const messages = (action.payload as any)?.data?.messages;
            state.loadings.getMessages = false;
            /*----filter unread messages-----*/
            state.messages = messages;
            state.mediaList = messages?.map((message: IMessage) => message.attachments)?.flat();
            /*----remaining unread messages-----*/
            state.unreadMessages = state.unreadMessages?.filter((message) => message?.chat !== chatID);
         });
         builder.addCase(this.api.rejected, (state) => {
            state.loadings.getMessages = false;
            state.messages = [];
         });
      },
   };

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
            state.loadings.getChatDetails = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.loadings.getChatDetails = false;
            state.chatDetails = action.payload?.data?.details;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.loadings.getChatDetails = false;
            state.chatDetails = null;
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
         setMessages(state, { payload }: PayloadAction<IMessage | IMessage[]>) {
            Array.isArray(payload) ? (state.messages = payload) : state.messages.push(payload);
         },
         setUnreadMessages(state, { payload }: PayloadAction<IMessage>) {
            state.unreadMessages.push(payload);
         },
         setTyping(state, { payload }: PayloadAction<string>) {
            state.typing = payload;
         },
         clearChatDetails(state) {
            state.chatDetails = null;
         },
         updateChatDetails(state, action) {
            state.chatDetails = {
               ...state.chatDetails,
               ...action.payload,
            };
         },
      },
      extraReducers: (builder) => {
         this.getMessages.reducer(builder);
         this.getChatDetails.reducer(builder);
      },
   });
   public chatActions = this.silce.actions;
   public chatReducer = this.silce.reducer;
}

export const chatService = new ChatService();
export const chatActions = chatService.chatActions;
export const chatReducer = chatService.chatReducer;
