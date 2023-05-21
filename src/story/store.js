import { configureStore } from "@reduxjs/toolkit";
import getUserSlice from "./UserStory";

export default configureStore({
  reducer: {
    user: getUserSlice
  }
})