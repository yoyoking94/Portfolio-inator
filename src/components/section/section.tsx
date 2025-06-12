import React from "react";
import SubtitleH2 from "../subtitleH2/subtitleH2";

type SectionProps = {
  id: string;
  title: string;
  children?: React.ReactNode;
  articleComponent?: React.ReactNode;
};

const Section = ({ id, title, children }: SectionProps) => (
  <section id={id} className="h-screen flex items-center justify-center">
    <SubtitleH2>{title}</SubtitleH2>
    {children}
  </section>
);

export default Section;
