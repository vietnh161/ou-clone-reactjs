import { Button } from "@mui/material";
import React, { Component } from "react";
import "./product.scss";

type ProductProps = {
  product: any;
};
export class Product extends Component<ProductProps, any> {
  render() {
    const product = this.props.product;
    return product ? (
      <div className="product-component">
        <Button className="product-item" fullWidth>
          <div className="product-image">
            <img
              src={
                product.images?.high_res ||
                product.images?.med_res ||
                product.images?.low_res
              }
            />
          </div>
          <div className="product-info">
            <div className="product-name"> {product.name}</div>
            <div className="product-des"> {product.description}</div>
          </div>
        </Button>
      </div>
    ) : (
      ""
    );
  }
}

export default Product;
