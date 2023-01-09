import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/layout";
import Menu from "./components/menu/menu";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Menu />,
      },
    ],
  },
]);


axios.interceptors.request.use((request) => {
  if (request.headers) {
    //@ts-ignore
    request.headers.Authorization = "Basic enVWVzN+MTU1NDVkw=";
  }
  return request;
});
function App() {
  return <RouterProvider router={router} />;
}

export default App;
