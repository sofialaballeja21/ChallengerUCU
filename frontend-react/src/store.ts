import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { RickandMortyApi } from "./API/api";

const store = configureStore({
    reducer: {
        [RickandMortyApi.reducerPath]: RickandMortyApi.reducer,
    },

    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(RickandMortyApi.middleware),
});

setupListeners(store.dispatch);

export default store;