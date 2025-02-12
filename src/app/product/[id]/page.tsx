"use client";
import Product from "@/components/Product";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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

const page = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);

        if (!response.ok) {
          throw new Error("failed to get products");
        }

        const data = await response.json();
        setProduct(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  if (!product) return <p className="text-center mt-10">Loading product...</p>;

  return (
    <Product
      title={product.title}
      description={product.description}
      image={product.image}
      rating={product.rating.rate}
      count={product.rating.count}
      price={product.price}
    />
  );
};

export default page;
