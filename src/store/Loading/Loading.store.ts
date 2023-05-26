import { createSlice } from "@reduxjs/toolkit";

const stockLoading = createSlice({
    name: 'loading',

    initialState: {
        loading: false
    },

    reducers: {

        active(state) {
            state.loading = true;
        },

        deactivate(state) {
            state.loading = false;
        }

    }

});

export const { active, deactivate } = stockLoading.actions;
export default stockLoading.reducer;