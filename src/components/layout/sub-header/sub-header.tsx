import React, { Component } from "react";
import './sub-header.scss'
export class SubHeader extends Component {
  render() {
    return (
      <div className="sub-header-component">
        <img
          className="img"
          src="https://d7xy6ff1t9nxr.cloudfront.net/hoteldemotwo.orderup.net.au/images/theme/background/default/store-top-half.jpg"
        ></img>
        <div className="address ">
          <p className="text-light name ">Order Up! Demo ( 2 )</p>
          <div className="text-location location ">
            <p> Chapel Street, VIC </p>
          </div>
        </div>
        <div className="banner"></div>
      </div>
    );
  }
}

export default SubHeader;
