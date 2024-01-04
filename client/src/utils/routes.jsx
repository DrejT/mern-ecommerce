import { Routes, Route } from "react-router-dom";
import Product from "./../pages/product";
import Register from "./../pages/register";
import Contact from "./../pages/contact";
import Login from "./../pages/login";
import Home from "./../pages/home";
import About from "./../pages/about";
import Layout from "./../pages/layout";
import Dashboard from "../pages/dashboard/dashboard";
import App from "../App";
import Profile from "../pages/profile";
import Store from "../pages/store";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<App />}></Route>
          <Route index element={<Home />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="products" element={<Product />}></Route>
          <Route path="contact" element={<Contact />}></Route>
          <Route path="services" element={<About />}></Route>
          <Route path="u">
            <Route path=":username" element={<Profile />}></Route>
          </Route>
          <Route path="s">
            <Route path=":storename" element={<Store />}>
              <Route path="i">
                <Route path=":itemname"></Route>
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="store" element={<About />}></Route>
          <Route path="items" element={<About />}></Route>
          <Route path="orders" element={<About />}></Route>
          <Route path="reviews" element={<About />}></Route>
          <Route path="settings" element={<About />}></Route>
        </Route>
      </Routes>
    </>
  );
}
