import React from "react";

type MainProps = {
  children: React.ReactNode;
  className?: string;
};

const Main: React.FC<MainProps> = ({ children, className }) => {
  return (
    <main
      className={`w-screen flex items-center justify-center ${
        className || ""
      }`}
    >
      {children}
    </main>
  );
};

export default Main;
