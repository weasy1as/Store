import Link from "next/link";
import React from "react";
import { BsBasket2 } from "react-icons/bs";
import { GiClothes } from "react-icons/gi";
import { FaArrowDown } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="bg-black text-white flex justify-between p-4 items-center">
      <div className="flex items-center gap-3">
        <Link href="/">
          <GiClothes size={55} />
        </Link>
        <Link
          href="/"
          className="text-2xl hidden sm:block font-bold tracking-wide text-white"
        >
          Wardrobe Wonders
        </Link>
      </div>
      <ul className="hidden gap-9  sm:flex ">
        <li className="hover:underline hover:font-bold">
          <Link href="/electronics">Electronics</Link>
        </li>
        <li className="hover:underline hover:font-bold">
          <Link href="/Jewelery">Jewelery</Link>
        </li>
        <li className="hover:underline hover:font-bold">
          <Link href="/mensWear">Men's clothing</Link>
        </li>
        <li className="hover:underline hover:font-bold">
          <Link href="/womanWear">Women's clothing</Link>
        </li>
      </ul>
      <div className="w-full flex justify-center sm:hidden">
        <FaArrowDown />
      </div>

      <Link
        href="/cart"
        className="hover:scale-110 cursor-pointer hover:text-blue-500"
      >
        <BsBasket2 size={25} />
      </Link>
    </div>
  );
};

export default Navbar;
