import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/header";
import Sidebar from "./sidebar/sidebar";
import SubHeader from "./sub-header/sub-header";
import "./layout.scss";
import Cart from "../cart/cart";
export class Layout extends Component {
  render() {
    return (
      <div className="layout-component">
        <div className="header">
          <Header></Header>
          <SubHeader></SubHeader>
        </div>
        <div className="main">
          <Sidebar></Sidebar>
          <div className="main-content">
            <Outlet />
          </div>
          <Cart></Cart>
        </div>
      </div>
    );
  }
  componentDidMount(): void {}
}

export default Layout;
