import Footer from "../components/footer.layout";
import "./layout.styles.css";
import NavigationBar from "../components/navibar.layout";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <div>
        <NavigationBar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
