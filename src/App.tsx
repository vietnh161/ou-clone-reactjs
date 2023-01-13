import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import allActions from "./actions";
import "./App.scss";
import Layout from "./components/layout/layout";
import ProducDetail from "./components/product-detail/product-detail";
import ProductList from "./components/product-list/product-list";
import SelectLocaion from "./components/store-selector/select-location/select-location";
import SelectMethodDetail from "./components/store-selector/select-method-detail/select-method-detail";
import SelectMethod from "./components/store-selector/select-method/select-method";
import StoreSelector from "./components/store-selector/store-selector";
import { StoreState } from "./reducers/store.reducer";
import storeService from "./services/store.service";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "",
        element: <ProductList />,
        children: [
          {
            path: "product/:id",
            element: <ProducDetail />,
          },
          {
            path: "stores",
            element: <StoreSelector />,
            children: [
              {
                path: "",
                element: <SelectLocaion />,
              },
              {
                path: ":id",
                element: <SelectMethod />,
              },
              {
                path: ":sid/:mid",
                element: <SelectMethodDetail />,
              },
            ],
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
  const dispatch = useDispatch();

  useEffect(() => {
    storeService
    .getStores()
    .then((res)  => {
      if(res?.data?.stores) {
        dispatch(allActions.storeActions.setAllStores(res.data.stores))
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }, [])
 
  return <RouterProvider router={router} />;
}

export default App;
