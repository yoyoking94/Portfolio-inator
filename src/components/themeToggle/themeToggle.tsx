import React from "react";

type ThemeToggleProps = {
  onToggle: () => void;
  theme: "light" | "dark";
};

const ThemeToggle = ({ onToggle, theme }: ThemeToggleProps) => {
  return (
    <div
      className="fixed bottom-8 right-8 w-2 h-2 rounded-full shadow-lg m-5 hoverable"
      style={{
        backgroundColor: theme === "light" ? "#0b1215" : "#f7f4e7",
      }}
      onClick={onToggle}
      title="Changer de thème"
    />
  );
};

export default ThemeToggle;
