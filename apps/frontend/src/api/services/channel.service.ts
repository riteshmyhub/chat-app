import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import HttpInterceptor from "../interceptors/http.interceptor";

import { chatActions } from "./chat.service";
import { IChatDetails } from "../types/chat.type";
import ENDPOINTS from "../endpoint/endpoint";

const initialState = {
   channel: {
      isLoading: true,
      isDeleting: false,
      isCreating: false,
      isUpdating: false,
      isMemberRemoving: false,
      isMembersAdding: false,
      list: [] as IChatDetails[],
   },
};

class ChannelService extends HttpInterceptor {
   createChannel = {
      api: createAsyncThunk("createChannel", async (args: FormData, thunkAPI) => {
         try {
            const { data } = await this.http.post(ENDPOINTS.USER.CHANNEL.CREATE_CHANNEL, args);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.channel.isCreating = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.channel.isCreating = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.channel.isCreating = false;
         });
      },
   };
   getChannels = {
      api: createAsyncThunk("getChannels*", async (_, thunkAPI) => {
         try {
            const { data } = await this.http.get(ENDPOINTS.USER.CHANNEL.GET_CHANNELS);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.channel.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.channel.isLoading = false;
            state.channel.list = action.payload?.data?.channels;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.channel.isLoading = false;
            state.channel.list = [];
         });
      },
   };

   updateChannels = {
      api: createAsyncThunk("updateChannels", async (body: FormData, thunkAPI) => {
         try {
            const { data } = await this.http.put(ENDPOINTS.USER.CHANNEL.UPDATE_CHANNEL, body);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.channel.isUpdating = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.channel.isUpdating = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.channel.isUpdating = false;
         });
      },
   };

   addMembers = {
      api: createAsyncThunk("addMembers", async (body: { channelID: string; members: string[] }, thunkAPI) => {
         try {
            const { data } = await this.http.put(ENDPOINTS.USER.CHANNEL.ADD_MEMBERS, body);
            thunkAPI.dispatch(chatActions.updateChatDetails({ members: data?.data?.members }));
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.channel.isMembersAdding = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.channel.isMembersAdding = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.channel.isMembersAdding = false;
         });
      },
   };

   removeMember = {
      api: createAsyncThunk("removeMember", async (params: { channelID: string; memberID: string }, thunkAPI) => {
         try {
            const { data } = await this.http.delete(ENDPOINTS.USER.CHANNEL.REMOVE_MEMBER, { params });
            thunkAPI.dispatch(chatActions.updateChatDetails({ members: data?.data?.members }));
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.channel.isMemberRemoving = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.channel.isMemberRemoving = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.channel.isMemberRemoving = false;
         });
      },
   };

   private slice = createSlice({
      name: "ChannelService",
      initialState: initialState,
      reducers: {},
      extraReducers: (builder) => {
         this.getChannels.reducer(builder);
         this.addMembers.reducer(builder);
         this.removeMember.reducer(builder);
         this.createChannel.reducer(builder);
         this.updateChannels.reducer(builder);
      },
   });

   actions = this.slice.actions;
   reducer = this.slice.reducer;
}

export const channelService = new ChannelService();
export const channelActions = channelService.actions;
export const channelReducer = channelService.reducer;
