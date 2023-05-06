import React from "react";

const ItemCart = ({ imageSrc, name, price, qty }) => {
  return (
    <div className="flex flex-row items-center gap-x-2">
      <img className="w-24" src={imageSrc} alt="Card" />
      <p className="text-sm text-black flex-1">{name}</p>
      <p className="text-sm text-black">x {qty}</p>
      <p className="text-primer font-bold text-sm">{price}</p>
    </div>
  );
};
export default ItemCart;
