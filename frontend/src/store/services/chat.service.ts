import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import HttpInterceptor from "../interceptors/http.interceptor";
import ENDPOINTS from "../endpoints/endpoints";
import { IChatDetails, IMessage, ITyping } from "@/types/chat.type";
import { LocalDatabase } from "@/utils";

const initialState = {
   loadings: {
      getContacts: true,
      getChatDetails: true,
      getMessages: true,
      getChannels: true,
      createChannel: false,
      addContact: false,
      removeMember: false,
      addMember: false,
      deleteContact: false,
   },
   contacts: [] as IChatDetails[],
   channels: [] as IChatDetails[],
   chatDetails: null as IChatDetails | null,
   messages: [] as IMessage[],
   unreadMessages: [] as IMessage[],
   onlineUsers: [] as string[],
   typing: { chatID: null, text: "" } as ITyping,
};

class ChatService extends HttpInterceptor {
   getContacts = {
      api: createAsyncThunk("getContacts*", async (_, thunkAPI) => {
         try {
            const { data } = await this.privateHttp.get(ENDPOINTS.CHAT.GET_CHATS);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.loadings.getContacts = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.loadings.getContacts = false;
            state.contacts = action.payload?.data?.chats?.filter((chat: any) => !chat.groupChat);
         });
         builder.addCase(this.api.rejected, (state) => {
            state.loadings.getContacts = false;
            state.contacts = [];
         });
      },
   };

   getChannels = {
      api: createAsyncThunk("getChannels*", async (_, thunkAPI) => {
         try {
            const { data } = await this.privateHttp.get(ENDPOINTS.CHAT.GET_CHATS);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.loadings.getChannels = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.loadings.getChannels = false;
            state.channels = action.payload?.data?.chats?.filter((chat: any) => chat.groupChat);
         });
         builder.addCase(this.api.rejected, (state) => {
            state.loadings.getChannels = false;
            state.channels = [];
         });
      },
   };

   //.
   createChannel = {
      api: createAsyncThunk("createChannel", async (args: FormData, thunkAPI) => {
         try {
            const { data } = await this.privateHttp.post(ENDPOINTS.CHAT.CREATE_CHAT, args);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.loadings.createChannel = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.loadings.createChannel = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.loadings.createChannel = false;
         });
      },
   };

   addContact = {
      api: createAsyncThunk("addContact", async (args: FormData, thunkAPI) => {
         try {
            const { data } = await this.privateHttp.post(ENDPOINTS.CHAT.CREATE_CHAT, args);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.loadings.addContact = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.loadings.addContact = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.loadings.addContact = false;
         });
      },
   };

   getChatDetails = {
      api: createAsyncThunk("getChatDetails*", async (chatID: string) => {
         try {
            const { data } = await this.privateHttp.get(ENDPOINTS.CHAT.GET_CHATS_DETAILS(chatID));
            return data;
         } catch (error) {
            return error;
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

   removeMember = {
      api: createAsyncThunk("removeMember", async (params: { memberID: string; chatID: string }, thunkAPI) => {
         try {
            const { data } = await this.privateHttp.delete(ENDPOINTS.CHAT.CHANNEL.REMOVE_MEMBERS, {
               params: params,
            });
            thunkAPI.dispatch(this.getChatDetails.api(params.chatID));
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.loadings.removeMember = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.loadings.removeMember = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.loadings.removeMember = false;
         });
      },
   };

   addMember = {
      api: createAsyncThunk("addMember", async (params: { chatID: string; members: string[] }, thunkAPI) => {
         try {
            const { data } = await this.privateHttp.post(ENDPOINTS.CHAT.CHANNEL.ADD_MEMBERS, params);
            thunkAPI.dispatch(this.getChatDetails.api(params.chatID));
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.loadings.addMember = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.loadings.addMember = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.loadings.addMember = false;
         });
      },
   };

   getMessages = {
      api: createAsyncThunk("getMessages*", async (chatID: string) => {
         try {
            //const { data } = await this.privateHttp.get(ENDPOINTS.CHAT.MESSAGES.GET_MESSAGES(chatID));
            const messages: IMessage[] = await LocalDatabase.messageCollection.find({ chat: chatID });
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
            const chatID = action.meta.arg;
            state.loadings.getMessages = false;
            /*----filter unread messages-----*/
            state.messages = (action.payload as any)?.data?.messages;
            /*----remaining unread messages-----*/
            state.unreadMessages = state.unreadMessages?.filter((message) => message?.chat !== chatID);
         });
         builder.addCase(this.api.rejected, (state) => {
            state.loadings.getMessages = false;
            state.messages = [];
         });
      },
   };

   deleteContact = {
      api: createAsyncThunk("deleteContact", async (chatID: string, thunkAPI) => {
         try {
            const { data } = await this.privateHttp.delete(ENDPOINTS.CHAT.DELETE_CHAT(chatID));
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.loadings.deleteContact = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.loadings.deleteContact = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.loadings.deleteContact = false;
         });
      },
   };

   /*  without reducer */
   searchUsers = {
      api: createAsyncThunk("searchUsers*", async (search: string, thunkAPI) => {
         try {
            const { data } = await this.privateHttp.get(ENDPOINTS.USER.SEARCH_USER, { params: { search } });
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
   };

   private silce = createSlice({
      name: "ChatService",
      initialState: initialState,
      reducers: {
         setOnlineUsers(state, { payload }: PayloadAction<string[]>) {
            state.onlineUsers = payload;
         },
         clearChatDetails(state) {
            state.chatDetails = null;
         },
         setMessages(state, { payload }: PayloadAction<IMessage | IMessage[]>) {
            Array.isArray(payload) ? (state.messages = payload) : state.messages.push(payload);
         },
         setTyping(state, { payload }: PayloadAction<ITyping>) {
            state.typing = payload;
         },
         setUnreadMessages(state, { payload }: PayloadAction<IMessage>) {
            state.unreadMessages.push(payload);
         },
      },
      extraReducers: (builder) => {
         this.getContacts.reducer(builder);
         this.getChannels.reducer(builder);
         this.createChannel.reducer(builder);
         this.addContact.reducer(builder);
         this.getChatDetails.reducer(builder);
         this.getMessages.reducer(builder);
         this.removeMember.reducer(builder);
         this.addMember.reducer(builder);
         this.deleteContact.reducer(builder);
      },
   });
   public chatActions = this.silce.actions;
   public chatReducer = this.silce.reducer;
}

export const chatService = new ChatService();
export const chatActions = chatService.chatActions;
export const chatReducer = chatService.chatReducer;
