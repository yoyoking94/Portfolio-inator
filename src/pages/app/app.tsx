import Header from "../header/header";
import Nav from "../nav/nav";
import Main from "../main/main";
import Section from "@/components/section/section";
import Footer from "../footer/footer";
import CustomCursor from "@/components/customCursor/customCursor";

export default function App() {
  return (
    <>
      <CustomCursor />
      <Header></Header>
      <Nav></Nav>
      <Main>
        <Section></Section>
      </Main>
      <Footer></Footer>
    </>
  );
}
