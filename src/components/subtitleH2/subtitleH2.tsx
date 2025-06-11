import React from 'react';

type SubtitleH2Props = {
  children: React.ReactNode;
};

const SubtitleH2: React.FC<SubtitleH2Props> = ({ children }) => {
  return <h2>{children}</h2>;
};

export default SubtitleH2;
