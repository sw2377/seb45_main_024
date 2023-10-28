import { createSlice } from "@reduxjs/toolkit";
import { fetchTechTags } from "../thunks/techTagsThunks";

import { TechTagTypes } from "../../../model/techTagTypes";

import dummyData from "../../../dummy-data.json"; // 서버 안될시 TEST

interface TechTagsState {
  data: TechTagTypes[];
}

const initialState: TechTagsState = {
  data: [],
};

const techTagsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Fetch
    builder.addCase(fetchTechTags.pending, () => {
      // throw new Error(); // 서버 안될시 TEST
    });
    builder.addCase(fetchTechTags.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchTechTags.rejected, state => {
      state.data = dummyData["tags/tech"].data as TechTagTypes[]; // 서버 안될시 TEST
    });
  },
});

export const techTagsReducer = techTagsSlice.reducer;
