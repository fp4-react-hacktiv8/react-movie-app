import { createSlice } from "@reduxjs/toolkit";
import { getPopularMovies, searchMovies } from "./MovieAction";

const initialState = {
  isLoading: null,
  error: null,
  movies: {
    popularMovies: [],
    topRatedMovies: [],
    upcomingMovies: [],
  },
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    favorite: (state, action) => {
      state.movies = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPopularMovies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPopularMovies.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
    builder.addCase(getPopularMovies.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.movies.popularMovies = payload.results;
    });
    builder.addCase(searchMovies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchMovies.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
    builder.addCase(searchMovies.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.movies.popularMovies = payload.results;
    });
  },
});

export const { favorite } = movieSlice.actions;
export default movieSlice.reducer;
