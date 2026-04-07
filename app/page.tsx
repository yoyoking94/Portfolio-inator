import CustomCursor from "./components/common/CustomCursor";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import Nav from "./components/layout/Nav";

export default function Home() {
  return (
    <main>
      <CustomCursor />
      <Header></Header>
      <Nav></Nav>
      <Main></Main>
      <Footer></Footer>
    </main>
  );
}
