import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";
import Layout from "./components/layout/layout";
import ProducDetail from "./components/product-detail/product-detail";
import ProductList from "./components/product-list/product-list";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <ProductList />,
        children: [
          {
            path: "/product/:id",
            element: <ProducDetail />,
          },
        ],
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
