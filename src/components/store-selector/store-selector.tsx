import { Outlet } from "react-router";
import SelectLocaion from "./select-location/select-location";
import SelectLocation from "./select-location/select-location";

export default function StoreSelector() {
  return <div>
        <Outlet></Outlet>
  </div>;
}
