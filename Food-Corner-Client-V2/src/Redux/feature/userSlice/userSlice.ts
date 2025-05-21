import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { JwtPayload } from "jwt-decode";

export interface UserState {
  token: string | null;
  user:
    | (JwtPayload & {
        role: string;
        userEmail: string;
      })
    | null;
}

const initialState: UserState = {
  token: null,
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, actions: PayloadAction<UserState>) => {
      state.user = actions.payload.user;
      state.token = actions.payload.token;
    },
    userLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, userLogout } = userSlice.actions;

export default userSlice.reducer;
