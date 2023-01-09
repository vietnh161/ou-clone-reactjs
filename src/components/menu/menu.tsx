import Button from "@mui/material/Button";
import axios from "axios";
import React, { Component } from "react";

export class Menu extends Component {
  data: any;
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
    this.data = [];
  }
  componentDidMount(): void {
    axios
      .post("/api/menu/1/get-menu", undefined)
      .then((res) => console.log(res));
  }
  render() {
    return (
      <div>
        <Button variant="contained">Hello World</Button>
      </div>
    );
  }
}

export default Menu;
