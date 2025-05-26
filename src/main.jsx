import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
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

// ✅ Set your actual GitHub repo name here
const repoName = "News24X7";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="category" element={<Category />} />
      <Route path="contact" element={<Contact />} />
    </Route>
  ),
  {
    basename: `/${repoName}`, // 👈 Required for GitHub Pages
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
