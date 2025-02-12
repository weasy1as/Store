import React from "react";

const Card = ({
  title,
  description,
  image,
  rating,
  price,
  count,
}: {
  title: string;
  description: string;
  image: string;
  rating: number;
  price: number;
  count: number;
}) => {
  return (
    <div className="flex flex-col justify-between border-2 border-gray-400 w-[300px] h-[500px] px-6 pb-8 pt-6  border-l-4 border-accent bg-white shadow-lg rounded-lg hover:shadow-xl hover:scale-[1.03] transition-transform transform duration-200">
      <img src={image} alt="" className="w-[250px] h-[200px] object-contain" />
      <div className="w-full">
        <h1 className="text-md font-extrabold ">{title}</h1>
        <p className="text-sm font-light">{description.slice(0, 30)}....</p>
        <p>
          Rating: {rating}({count})
        </p>
        <div className="w-full flex justify-between items-center">
          <p className="font-extrabold">Price: {price}</p>
          <button className="bg-black p-2 rounded-xl text-white hover:bg-white hover:text-black hover:shadow-xl hover:border-black hover:border-2">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
