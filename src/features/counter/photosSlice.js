import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPhotos = createAsyncThunk("photos/fetchPhotos", async (_, { rejectWithValue, dispatch }) => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/photos?_limit=12");
        if (!response.ok) {
            throw new Error("Что-то пошло не так!");
        }
        const data = await response.json();
        dispatch(addFieldLike(data));
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const initialState = {
    photos: [],
    error: null,
    status: null,
    filtred: false
};

export const photosSlice = createSlice({
    name: "photos",
    initialState,
    reducers: {
        addFieldLike(state, action) {
            let updatePayload = action.payload.map((el) => {
                return { ...el, isLiked: false };
            });
            state.status = "fullfiled";
            state.photos = updatePayload;
        },
        addLikeOnPhoto(state, action) {
            state.photos.map((photo) => {
                if (photo.id === action.payload) {
                    photo.isLiked = !photo.isLiked;
                }
                return photo;
            });
        },
        deletePhoto(state, action) {
            state.photos = state.photos.filter((photo) => photo.id !== action.payload);
        },
        showLikedPhotos(state) {
            state.filtred = !state.filtred;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchPhotos.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchPhotos.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload;
            });
    }
});

export const { addFieldLike, addLikeOnPhoto, deletePhoto, showLikedPhotos } = photosSlice.actions;

export const photos = (state) => state.photos.photos;
export const filtred = (state) => state.photos.filtred;

export default photosSlice.reducer;
