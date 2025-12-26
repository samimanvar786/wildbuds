// store/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  slug?: string;
  size?: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const itemToAdd = {
        ...action.payload,
        price: Number(action.payload.price) || 0,
        quantity: Number(action.payload.quantity) || 1,
      };

      const existingItem = state.items.find(item => item.id === itemToAdd.id);

      if (existingItem) {
        existingItem.quantity += itemToAdd.quantity;
      } else {
        state.items.push(itemToAdd);
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = Number(action.payload.quantity) || 1;
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
