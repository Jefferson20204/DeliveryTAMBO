import { createSlice } from "@reduxjs/toolkit";

// {id:Number,quantity:number}

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartSlice = createSlice({
  name: "cartState",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex !== -1) {
        // Si ya existe, aumenta la cantidad
        state.cart[existingIndex].quantity += action.payload.quantity;
        state.cart[existingIndex].subTotal =
          state.cart[existingIndex].quantity * state.cart[existingIndex].price;
      } else {
        // Si no existe, lo agrega
        state.cart.push(action.payload);
      }
    },

    removeFromCart: (state, action) => {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.productId),
      };
    },

    updateQuantity: (state, action) => {
      const updatedCart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            quantity: action.payload.quantity,
            subTotal: item.price * action.payload.quantity,
          };
        }
        return item;
      });

      return {
        ...state,
        cart: updatedCart,
      };
    },

    deleteCart: (state) => {
      return {
        ...state,
        cart: [],
      };
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, deleteCart } =
  cartSlice?.actions;

export const countCartItems = (state) =>
  state?.cartState?.cart?.reduce((total, item) => total + item.quantity, 0);

// export const countCartItems = (state) => state?.cartState?.cart?.length;
export const selectCartItems = (state) => state?.cartState?.cart ?? [];
export default cartSlice.reducer;
