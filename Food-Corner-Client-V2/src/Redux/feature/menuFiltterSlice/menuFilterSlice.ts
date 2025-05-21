import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IMenuFilter {
  menuAvailableTime: string;
}

const initialState: IMenuFilter = {
  menuAvailableTime: "",
};

export const menuFilterSlice = createSlice({
  name: "menuFilterSlice",
  initialState,
  reducers: {
    filterMenuAvailable: (state, action: PayloadAction<string>) => {
      state.menuAvailableTime = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { filterMenuAvailable } = menuFilterSlice.actions;

export default menuFilterSlice.reducer;
