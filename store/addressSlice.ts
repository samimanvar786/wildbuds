// store/addressSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Address {
  id: number;
  full_name: string;
  phone: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  address_type: "billing" | "shipping";
  is_default?: boolean;
}

interface AddressState {
  items: Address[];
  loading: boolean;
}

const initialState: AddressState = {
  items: [],
  loading: false,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddresses(state, action: PayloadAction<Address[]>) {
      state.items = action.payload;
    },
    addAddress(state, action: PayloadAction<Address>) {
      state.items.push(action.payload);
    },
    removeAddress(state, action: PayloadAction<number>) {
      state.items = state.items.filter(a => a.id !== action.payload);
    },
    clearAddresses(state) {
      state.items = [];
    },
  },
});

export const {
  setAddresses,
  addAddress,
  removeAddress,
  clearAddresses,
} = addressSlice.actions;

export default addressSlice.reducer;
