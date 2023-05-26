import { createSlice } from "@reduxjs/toolkit";

const stockLogin = createSlice({
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

export const { login, logout } = stockLogin.actions;
export default stockLogin.reducer;