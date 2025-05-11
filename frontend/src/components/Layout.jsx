// import Content from "./Content";
import Footer from "./Footer";
import Menu from "./Menu";

const Layout = ({ Component }) => {
  return (
    <>
      <Menu />
      <div className="mt-16 min-h-[calc(100vh-4rem)] box-border">{<Component />}</div>
      <Footer />
    </>
  );
};
export default Layout;
