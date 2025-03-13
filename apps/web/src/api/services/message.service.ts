import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import HttpInterceptor from "../interceptors/http.interceptor";
import { IMessage, IUnreadMessage } from "../types/chat.type";
import ENDPOINTS from "../endpoint/endpoint";

const initialState = {
   message: {
      isLoading: true,
      list: [] as IMessage[],
   },
   unreadMessages: JSON.parse(localStorage.getItem("unreadMessages") || ("[]" as string)) as IUnreadMessage[],
};

class MessageService extends HttpInterceptor {
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
            state.message.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            /*----user messages-----*/
            const messages = (action.payload as any)?.data?.messages;
            state.message.isLoading = false;
            state.message.list = messages;
            /*----remove unread messages-----*/
            const chatID = action.meta.arg;
            state.unreadMessages = state?.unreadMessages?.filter((message) => message?.chat !== chatID);
            localStorage.setItem("unreadMessages", JSON.stringify(state.unreadMessages));
         });
         builder.addCase(this.api.rejected, (state) => {
            state.message.isLoading = false;
            state.message.list = [];
         });
      },
   };

   private silce = createSlice({
      name: "ChatService",
      initialState: initialState,
      reducers: {
         setMessages(state, { payload }: PayloadAction<IMessage | IMessage[]>) {
            Array.isArray(payload) ? (state.message.list = payload) : state.message.list.push(payload);
         },
         setUnreadMessages(state, { payload }: PayloadAction<IMessage>) {
            const attachments = payload.attachments || [];
            state.unreadMessages.push({
               chat: payload.chat,
               _id: payload._id,
               content: attachments?.length ? `[${attachments.length}] files send` : payload?.content,
               createdAt: payload.createdAt,
               isChannel: payload.isChannel,
            });
            localStorage.setItem("unreadMessages", JSON.stringify(state.unreadMessages));
         },
      },
      extraReducers: (builder) => {
         this.getMessages.reducer(builder);
      },
   });

   public messageActions = this.silce.actions;
   public messageReducer = this.silce.reducer;
}
export const messageService = new MessageService();
export const messageActions = messageService.messageActions;
export const messageReducer = messageService.messageReducer;
