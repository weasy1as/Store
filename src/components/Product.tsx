import React from "react";
import Navbar from "./Navbar";
import { IoStar, IoStarOutline } from "react-icons/io5";

const StarRating = ({ rating }: { rating: number }) => {
  const maxStars = 5;
  return (
    <div className="flex items-center">
      {/* Generate stars based on rating */}
      {Array.from({ length: maxStars }, (_, index) => (
        <span key={index} className="text-yellow-500">
          {index < Math.round(rating) ? <IoStar /> : <IoStarOutline />}
        </span>
      ))}
    </div>
  );
};
const Product = ({
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
    <div className="">
      <Navbar />

      <div className=" flex flex-col sm:flex-row gap-8 justify-center  items-center mt-6 sm:p-8">
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8">
          <img
            src={image}
            alt=""
            className="w-auto h-auto sm:h-[400px] object-contain"
          />
        </div>
        <div className="flex flex-col justify-between gap-6 sm:gap-10 h-full px-6 sm:px-8">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-center sm:text-left">
            {title}
          </h1>
          <p className="sm:text-xl font-light text-center sm:text-left">
            {description}
          </p>

          <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start">
            <StarRating rating={rating} />
            <p className="text-gray-600 text-sm">
              {rating} ({count} reviews)
            </p>
          </div>

          <div className="w-full px-4 flex flex-col sm:flex-row gap-4 sm:gap-4 justify-between items-center">
            <p className="text-3xl font-extrabold">Price: {price}</p>
            <button className="bg-black p-2 w-full sm:w-auto rounded-xl text-white hover:bg-white hover:text-black hover:shadow-xl hover:border-black hover:border-2">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
