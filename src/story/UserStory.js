import { createSlice } from "@reduxjs/toolkit";

export const userStore = createSlice({
  name: 'user',
  initialState: {
    value: null,
    array: []
  },
  reducers: {
    getUser: (state, action) => {
      state.value = action.payload
    },
    getData: (state, action) => {
      state.array.push(action.payload)
    }
  }
})
export const { getUser, getData } = userStore.actions
export default userStore.reducer