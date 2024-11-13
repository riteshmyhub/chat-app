import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ENDPOINTS from "../endpoints/endpoints";
import HttpInterceptor from "../interceptors/http.interceptor";
import { IChatDetails } from "@/types/chat.type";
import { chatActions } from "./chat.service";

const initialState = {
   loadings: {
      getChannels: true,
      createChannel: false,
      updateChannel: false,
      deleteChannel: false,
      addMembers: false,
      removeMember: false,
   },
   channels: [] as IChatDetails[],
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
            state.loadings.getChannels = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            console.log(action.payload?.data?.channels);
            state.loadings.getChannels = false;
            state.channels = action.payload?.data?.channels;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.loadings.getChannels = false;
            state.channels = [];
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
            state.loadings.addMembers = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.loadings.addMembers = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.loadings.addMembers = false;
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

   private slice = createSlice({
      name: "ChannelService",
      initialState: initialState,
      reducers: {},
      extraReducers: (builder) => {
         this.getChannels.reducer(builder);
         this.addMembers.reducer(builder);
         this.removeMember.reducer(builder);
         this.createChannel.reducer(builder);
      },
   });

   actions = this.slice.actions;
   reducer = this.slice.reducer;
}

export const channelService = new ChannelService();
export const channelActions = channelService.actions;
export const channelReducer = channelService.reducer;
