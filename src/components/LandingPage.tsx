"use client";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import Filter from "./Filter";

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

const LandingPage = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {
          throw new Error("failed to get products");
        }

        const data = await response.json();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const filterClick = (type: string) => {
    if (type === "PLH") {
      const sortedProducts = [...products].sort((a, b) => a.price - b.price);
      setProducts([...sortedProducts]);
    }

    if (type === "PHL") {
      const sortedProducts = [...products].sort((a, b) => b.price - a.price);
      setProducts([...sortedProducts]);
    }

    if (type === "RLH") {
      const sortedProducts = [...products].sort(
        (a, b) => a.rating.rate - b.rating.rate
      );
      setProducts([...sortedProducts]);
    }

    if (type === "RHL") {
      const sortedProducts = [...products].sort(
        (a, b) => b.rating.rate - a.rating.rate
      );
      setProducts([...sortedProducts]);
    }
  };

  if (!products) return <p className="text-center mt-10">Loading product...</p>;

  return (
    <div className="w-full h-screen">
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
        <Filter filterClick={filterClick} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6 gap-6 ">
          {products?.map((product) => (
            <div key={product.id}>
              <Card
                id={product.id}
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

export default LandingPage;
