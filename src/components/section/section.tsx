import React from 'react';
import SubtitleH2 from '../subtitleH2/subtitleH2';

type SectionProps = {
  children?: React.ReactNode;
  articleComponent?: React.ReactNode;
};

const Section: React.FC<SectionProps> = ({ children, articleComponent }) => {
  return (
    <section>
      <SubtitleH2>Ma section</SubtitleH2>
      {articleComponent}
      {children}
    </section>
  );
};

export default Section;
