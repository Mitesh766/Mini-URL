import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoading: false,
    isLoggedIn:false,
  },
  reducers: {
    addUserData: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setLogin: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { addUserData, setLoading,setLogin } = userSlice.actions;

export default userSlice.reducer;
