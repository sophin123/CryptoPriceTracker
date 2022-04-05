import React from "react";

export default function CurrencyFormat(num) {
  return "$" + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
