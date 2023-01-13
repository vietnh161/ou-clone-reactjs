import { connect, useSelector } from "react-redux";
import { Outlet } from "react-router";

export default function StoreSelector() {
  return (
    <div className="aaa">
      <Outlet></Outlet>
    </div>
  );
}
