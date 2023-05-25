import { createSlice } from "@reduxjs/toolkit";

const stock = createSlice({
    name: 'login',

    initialState: {
        login: false
    },

    reducers: {

        login(state) {
            state.login = true;
        },

        logout(state) {
            state.login = false;
        }

    }

});

export const { login, logout } = stock.actions;
export default stock.reducer;