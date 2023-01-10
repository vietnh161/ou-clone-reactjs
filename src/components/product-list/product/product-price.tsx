import _ from "lodash";
import React from "react";
import { NumericFormat } from "react-number-format";

export default function ProductPrice(props: { sizes: any }) {
  const cheapestSize = _.values(props.sizes).sort(
    (x, y) => x.price - y.price
  )[0];
  return (
    <div className="product-price">
      {cheapestSize.price > 0 ? (
        <NumericFormat
          value={cheapestSize.price.toFixed(2)}
          displayType={"text"}
          thousandSeparator={true}
          decimalSeparator="."
          prefix={"$"}
        />
      ) : (
        ""
      )}
    </div>
  );
}
