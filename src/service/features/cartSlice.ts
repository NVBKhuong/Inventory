import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { IProduct } from "../../models/Produdct";

interface CartItem extends IProduct {
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<IProduct>) => {
            const { id, name, brand, price, quantity, ...rest } = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity += 1; // Tăng số lượng nếu sản phẩm đã tồn tại trong giỏ hàng
            } else {
                state.items.push({
                    id,
                    name,
                    brand,
                    price,
                    quantity: 1,
                    ...rest,
                });
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const itemId = action.payload;
            state.items = state.items.filter(item => item.id !== itemId);
        },
        updateCartItemQuantity: (state, action: PayloadAction<{ id: string, quantity: number }>) => {
            const { id, quantity } = action.payload;
            const cartItem = state.items.find(item => item.id === id);
            if (cartItem) {
                cartItem.quantity = quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
