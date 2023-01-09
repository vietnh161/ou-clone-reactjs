import { Button, Menu, MenuItem, TextField } from "@mui/material";
import React, { Component } from "react";
import "./header.scss";
export class Header extends Component {
  render() {
    return (
      <div className="header-component bg_grounded_element">
        <div className="logo m-r-24">
          <img
            className="logo"
            src="https://d7xy6ff1t9nxr.cloudfront.net/hoteldemotwo.orderup.net.au/images/theme/logo/default/greenvillelogo-email.png"
          />
        </div>
        <div className="filter-button m-r-24">
          <Button variant="outlined">Filter</Button>
        </div>
        <div className="search m-r-24">
          <TextField id="outlined-basic" fullWidth label="search" variant="outlined" />
        </div>
        <div className="cart m-r-24">
          <Button variant="contained">Cart</Button>
        </div>
        <div className="user-profile m-r-24">
          <Button variant="contained">User</Button>

          {/* <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Dashboard
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu> */}
        </div>
      </div>
    );
  }
}

export default Header;
