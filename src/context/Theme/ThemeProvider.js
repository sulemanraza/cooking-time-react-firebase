import { useState, useReducer } from "react";
import { ThemeContext } from "./ThemeContext";

// initial State and Reducer
const iState = { color: "blue", mode: "dark" };

const themeReducer = (state, action) => {
  if (action.type === "CHANGE_COLOR") {
    return { ...state, color: action.payload };
  }
  if (action.type === "CHANGE_MODE") {
    return { ...state, mode: action.payload };
  }

  return state;
};

// create Provider
export default function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, iState);

  const changeColor = (color) => {
    dispatch({ type: "CHANGE_COLOR", payload: color });
  };

  const changeMode = (mode) => {
    dispatch({ type: "CHANGE_MODE", payload: mode });
  };

  return (
    <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
