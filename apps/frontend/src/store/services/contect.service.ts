import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import HttpInterceptor from "../interceptors/http.interceptor";
import ENDPOINTS from "../endpoints/endpoints";
import { IContact } from "@/types/contact.type";

const initialState = {
   loadings: {
      getContacts: true,
      getContactDetails: true,
      addContact: false,
      deleteContact: false,
   },
   contacts: [] as IContact[],
   contactDetails: null as IContact | null,
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
            state.loadings.getContacts = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.loadings.getContacts = false;
            state.contacts = action.payload?.data?.contacts;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.loadings.getContacts = false;
            state.contacts = [];
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

   getContactDetails = {
      api: createAsyncThunk("getContactDetails*", async (id: string) => {
         const { data } = await this.http.get(ENDPOINTS.USER.GET_CONTACTS_DETAILS(id));
         return data;
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.loadings.getContactDetails = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.loadings.getContactDetails = false;
            state.contactDetails = action.payload?.data?.details;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.loadings.getContactDetails = false;
            state.contactDetails = null;
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
      reducers: {
         clearContectDetails(state) {
            state.contactDetails = null;
         },
      },
      extraReducers: (builder) => {
         this.getContacts.reducer(builder);
         this.addContact.reducer(builder);
         this.getContactDetails.reducer(builder);
         this.deleteContact.reducer(builder);
      },
   });
   public contactActions = this.silce.actions;
   public contactReducer = this.silce.reducer;
}

export const contactService = new ContactService();
export const contactActions = contactService.contactActions;
export const contactReducer = contactService.contactReducer;
