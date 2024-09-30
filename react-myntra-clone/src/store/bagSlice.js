import { createSlice } from "@reduxjs/toolkit";

const bagSlice = createSlice({
    name: 'bag',
    initialState : [],
    reducers: {
        addToBag: (state, action) => {
            state.push(action.payload); 
            // no return statement since we are directly modifying state
        },
        removeFromBag: (state, action) => {
            return state.filter(itemId => itemId !== action.payload);
            // since we are creating a new array using the filter function we have to return
        }
    }
});

export const bagActions = bagSlice.actions;

export default bagSlice;

