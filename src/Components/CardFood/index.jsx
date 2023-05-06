import React from "react";

const CardFood = ({ imageSrc, heading, subheading, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="max-w-sm rounded-sm overflow-hidden shadow-lg cursor-pointer"
    >
      <img className="w-full h-32" src={imageSrc} alt="Card" />
      <div className="px-6 text-center py-4 bg-white">
        <div className=" text-base mb-1">{heading}</div>
        <p className="text-primer font-bold text-base">{subheading}</p>
      </div>
    </div>
  );
};

export default CardFood;
