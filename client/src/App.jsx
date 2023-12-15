import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Layout from "./pages/layout";
import Product from "./pages/product";
import Register from "./pages/register";
import Contact from "./pages/contact";
import Login from "./pages/login"
import "./App.css";
function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App/>}></Route>
          <Route index element={<Home />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="products" element={<Product />}></Route>
          <Route path="contact" element={<Contact />}></Route>
          <Route path="services" element={<About />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
