import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CompanionsType } from "@/app/types";

interface NewTripState {
  place: string;
  dayCount: number;
  budget: number;
  peopleCount: number;
  companions: CompanionsType;
}

const initialState: NewTripState = {
  place: "Thailand",
  dayCount: 1,
  budget: 0,
  peopleCount: 1,
  companions: "solo",
};

const newTripSlice = createSlice({
  name: "newTrip",
  initialState,
  reducers: {
    setPlace: (state, action: PayloadAction<string>) => {
      state.place = action.payload;
    },
    setDayCount: (state, action: PayloadAction<number>) => {
      state.dayCount = action.payload;
    },
    setBudget: (state, action: PayloadAction<number>) => {
      state.budget = action.payload;
    },
    setPeopleCount: (state, action: PayloadAction<number>) => {
      state.peopleCount = action.payload;
    },
    setCompanions: (state, action: PayloadAction<CompanionsType>) => {
      state.companions = action.payload;
    },
  },
});

export const {
  setPlace,
  setDayCount,
  setBudget,
  setPeopleCount,
  setCompanions,
} = newTripSlice.actions;

export default newTripSlice.reducer;
