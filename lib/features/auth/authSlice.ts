import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  id: string | null;
  email: string | null;
  verified_email: boolean;
  name: string | null;
  given_name: string | null;
  family_name: string | null;
  picture: string | null;
}

const initialState: AuthState = {
  id: null,
  email: null,
  verified_email: false,
  name: null,
  given_name: null,
  family_name: null,
  picture: null,
};

// A helper function to get stored state from localStorage
const loadFromLocalStorage = (): AuthState => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : initialState;
  }
  return initialState;
};

const authSlice = createSlice({
  name: "auth",
  initialState: loadFromLocalStorage(),
  reducers: {
    authLogin: (state, action: PayloadAction<AuthState>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.verified_email = action.payload.verified_email;
      state.name = action.payload.name;
      state.given_name = action.payload.given_name;
      state.family_name = action.payload.family_name;
      state.picture = action.payload.picture;

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },
    authLogout: (state) => {
      Object.assign(state, initialState);
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    },
  },
});

export const { authLogin, authLogout } = authSlice.actions;
export default authSlice.reducer;
