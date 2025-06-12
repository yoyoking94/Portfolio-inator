import React from "react";

type FooterProps = {
  darkerBackground: string;
};

const footer: React.FC<FooterProps> = ({ darkerBackground }) => {
  return (
    <footer
      style={{
        backgroundColor: darkerBackground,
        transition: "background 0.3s",
      }}
      className="h-[8vh] flex items-center justify-centerw-screen flex items-center justify-center"
    >
      footer
    </footer>
  );
};

export default footer;
