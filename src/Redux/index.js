import { configureStore } from "@reduxjs/toolkit";
import moviewSlice from "./MovieSlice";

const store = configureStore({
  reducer: moviewSlice,
});

store.subscribe(() => {
  console.log("Store changed! ", store.getState());
});

export default store;
