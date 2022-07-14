// style
import "./ThemeSelector.css";
import React from "react";
import useTheme from "../hook/useTheme";
import modeIcon from "../assets/mode-icon.svg";

const ThemeSelector = () => {
  const { changeColor, changeMode, mode } = useTheme();
  const themeColor = ["red", "green", "#a435f0"];

  return (
    <div className="ThemeSelector">
      <div className="modeToggle">
        <img
          src={modeIcon}
          alt="mode icon"
          onClick={() => changeMode(mode === "dark" ? "light" : "dark")}
          style={{
            filter: mode === "dark" ? "invert(1)" : "invert(0)",
          }}
        />
      </div>
      <div className="ThemeButtons">
        {themeColor.map((color) => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
