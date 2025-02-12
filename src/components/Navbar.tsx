import Link from "next/link";
import React from "react";
import { BsBasket2 } from "react-icons/bs";
import { GiClothes } from "react-icons/gi";

const Navbar = () => {
  return (
    <div className="bg-black text-white flex justify-between p-4 items-center">
      <div>
        <GiClothes size={55} />
      </div>
      <ul className="flex gap-9 ">
        <li className="hover:underline hover:font-bold">
          <Link href="">Electronics</Link>
        </li>
        <li className="hover:underline hover:font-bold">
          <Link href="">Jewelery</Link>
        </li>
        <li className="hover:underline hover:font-bold">
          <Link href="">Men's clothing</Link>
        </li>
        <li className="hover:underline hover:font-bold">
          <Link href="">Women's clothing</Link>
        </li>
      </ul>

      <div className="hover:scale-110 cursor-pointer hover:text-blue-500">
        <BsBasket2 size={25} />
      </div>
    </div>
  );
};

export default Navbar;
