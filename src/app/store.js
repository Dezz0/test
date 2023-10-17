import { configureStore } from "@reduxjs/toolkit";
import photosSlice from "../features/counter/photosSlice";

export const store = configureStore({
    reducer: {
        photos: photosSlice
    }
});
