import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import HttpInterceptor from "../interceptors/http.interceptor";
import ENDPOINTS from "../endpoint/endpoint";
import { IContact } from "../types/contact.type";

const initialState = {
   contact: {
      isLoading: true,
      isAdding: false,
      isDeleting: false,
      list: [] as IContact[],
   },
};
class ContactService extends HttpInterceptor {
   getContacts = {
      api: createAsyncThunk("getContacts*", async (_, thunkAPI) => {
         try {
            const { data } = await this.http.get(ENDPOINTS.USER.GET_CONTACTS);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.contact.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            console.log(action.payload?.data?.contacts);

            state.contact.isLoading = false;
            state.contact.list = action.payload?.data?.contacts;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.contact.isLoading = false;
            state.contact.list = [];
         });
      },
   };

   addContact = {
      api: createAsyncThunk("addContact", async (userID: string, thunkAPI) => {
         try {
            const { data } = await this.http.post(ENDPOINTS.USER.ADD_CONTACT, { userID });
            thunkAPI.dispatch(this.getContacts.api());
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.contact.isAdding = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.contact.isAdding = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.contact.isAdding = false;
         });
      },
   };

   deleteContact = {
      api: createAsyncThunk("deleteContact", async (id: string, thunkAPI) => {
         try {
            const { data } = await this.http.delete(ENDPOINTS.USER.DELETE_CONTACT(id));
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.contact.isDeleting = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.contact.isDeleting = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.contact.isDeleting = false;
         });
      },
   };

   /*  without reducer */
   searchUsers = {
      api: createAsyncThunk("searchUsers*", async (search: string, thunkAPI) => {
         try {
            const { data } = await this.http.get(ENDPOINTS.USER.SEARCH_USER, { params: { search } });
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
   };

   private silce = createSlice({
      name: "ContactService",
      initialState: initialState,
      reducers: {},
      extraReducers: (builder) => {
         this.getContacts.reducer(builder);
         this.addContact.reducer(builder);
         this.deleteContact.reducer(builder);
      },
   });
   public contactActions = this.silce.actions;
   public contactReducer = this.silce.reducer;
}
export const contactService = new ContactService();
export const contactActions = contactService.contactActions;
export const contactReducer = contactService.contactReducer;
