import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import HttpInterceptor from "../interceptors/http.interceptor";
import { IMessage, ITyping } from "@/types/chat.type";

const initialState = {
   loadings: {
      getMessages: true,
   },
   messages: [] as IMessage[],
   unreadMessages: [] as IMessage[],
   typing: { chatID: null, text: "" } as ITyping,
};

class ChatService extends HttpInterceptor {
   getMessages = {
      api: createAsyncThunk("getMessages*", async (_: string) => {
         try {
            //const { data } = await this.privateHttp.get(ENDPOINTS.CHAT.MESSAGES.GET_MESSAGES(chatID));
            const messages: IMessage[] = [];
            const data = { data: { messages } };
            return data;
         } catch (error) {
            return error;
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.loadings.getMessages = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.loadings.getMessages = false;
            state.messages = (action.payload as any)?.data?.messages;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.loadings.getMessages = false;
            state.messages = [];
         });
      },
   };

   private silce = createSlice({
      name: "ChatService",
      initialState: initialState,
      reducers: {
         setMessages(state, { payload }: PayloadAction<IMessage | IMessage[]>) {
            Array.isArray(payload) ? (state.messages = payload) : state.messages.push(payload);
         },
         setUnreadMessages(state, { payload }: PayloadAction<IMessage>) {
            state.unreadMessages.push(payload);
         },
      },
      extraReducers: (builder) => {
         this.getMessages.reducer(builder);
      },
   });
   public chatActions = this.silce.actions;
   public chatReducer = this.silce.reducer;
}

export const chatService = new ChatService();
export const chatActions = chatService.chatActions;
export const chatReducer = chatService.chatReducer;
