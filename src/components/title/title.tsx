import React from "react";

type TitleProps = {
  children: React.ReactNode;
};

const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <h1 style={{ fontSize: "clamp(1.5rem, 5vw, 3rem)" }} className="hoverable">
      {children}
    </h1>
  );
};

export default Title;
