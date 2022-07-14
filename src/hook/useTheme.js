import { useContext } from "react";
import { ThemeContext } from "../context/Theme/ThemeContext";

export default function useTheme() {
  const context = useContext(ThemeContext);

  return context;
}
