"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { IoFilter } from "react-icons/io5";
import Navbar from "./Navbar";

interface ProductType {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
}

const Electronics = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/product/${id}`);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {
          throw new Error("failed to get products");
        }

        const data = await response.json();
        const electronics = data.filter((d) => d.category === "electronics");
        setProducts(electronics);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  if (!products) return <p className="text-center mt-10">Loading product...</p>;

  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className="flex flex-col pt-12 px-6 items-center">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Step Into Style with Wardrobe Wonders!
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          From everyday essentials to statement pieces—find your perfect look
          today.
        </p>
      </div>

      <div className="p-10">
        <div className="flex items-center gap-4">
          <p className="text-md font-extrabold tracking-tight">Filter</p>
          <IoFilter size={20} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6 gap-6 ">
          {products?.map((product) => (
            <div key={product.id} onClick={() => handleClick(product.id)}>
              <Card
                title={product.title}
                description={product.description}
                image={product.image}
                rating={product.rating.rate}
                count={product.rating.count}
                price={product.price}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Electronics;
