import Hero from "../components/hero";
import Navbar from "../components/navbar";

export default function Layout() {
  return (
    <>
      <div className="container-fluid">
        <Navbar />
        <Hero/>
      </div>
    </>
  );
}
