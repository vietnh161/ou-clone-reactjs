import { Button } from "@mui/material";
import React, { Component } from "react";
import ProductPrice from "./product-price";
import "./product.scss";

type ProductProps = {
  product: any;
  productSelected: (product: any) => void
};
export class Product extends Component<ProductProps, any> {
  render() {
    const product = this.props.product;
    return product ? (
      <div className="product-component">
        <Button className="product-item" fullWidth onClick={() => this.props.productSelected(product)}>
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
            <div className="product-name ">
              <span className="line-clamp-2"> {product.name}</span>
            </div>
            <div className="product-des">
              <span className="line-clamp-2"> {product.description}</span>
            </div>
            <ProductPrice sizes={product.sizes}></ProductPrice>
          </div>
        </Button>
      </div>
    ) : (
      ""
    );
  }
}

export default Product;
