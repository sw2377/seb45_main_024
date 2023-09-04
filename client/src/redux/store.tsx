import { configureStore } from "@reduxjs/toolkit";
import validationReducer from "./auth/validationSlice";
import signUpReducer from "./auth/signUpSlice";
import loginReducer from "./auth/LoginSlice";
import alertReducer from "./utility/alertSlice";

const store = configureStore({
  reducer: {
    validation: validationReducer,
    signUp: signUpReducer,
    login: loginReducer,
    alert: alertReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
