import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Layout from "./layout.jsx";
import Home from "./components/Home/Home.jsx";
import Category from "./components/Category/Category.jsx";
import Contact from "./components/Contact/Contact.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="category" element={<Category />} />
      <Route path="contact" element={<Contact />} />
    </Route>
  ),
  {
    basename: "/News24X7", // 👈 This is crucial
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
