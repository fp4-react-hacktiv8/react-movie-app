import { createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../Services/api";

export const getPopularMovies = createAsyncThunk(
  "movies/getPopularMovies",
  async ({ page }, { rejectWithValue }) => {
    console.log("Page", page);
    try {
      const response = await apiInstance.get(
        `/movie/popular?language=en-US&page=${page}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const searchMovies = createAsyncThunk(
  "movies/searchMovies",
  async ({ query, page }, { rejectWithValue }) => {
    try {
      const response = await apiInstance.get(
        `/search/movie?query=${query}&language=en-US&page=${page}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
