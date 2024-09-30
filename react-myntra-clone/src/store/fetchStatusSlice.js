import { createSlice } from "@reduxjs/toolkit";

const fetchStatusSlice = createSlice({
    name: 'fetchStatus',
    initialState : {
        fetchDone: false,
        currentlyFetching: false
    },
    reducers: {
        showFetchDone: (state) => {
            state.fetchDone = true;
        },
        showFetchingStarting: (state) => {
            state.currentlyFetching = true;
        },
        showFetchingDone: (state) => {
            state.currentlyFetching = false;
        }
    }
});

export const fetchStatusActions = fetchStatusSlice.actions;

export default fetchStatusSlice;

