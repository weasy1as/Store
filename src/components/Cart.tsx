"use client";
import React, { useState } from "react";
import Navbar from "./Navbar";
import Card from "./Card";

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

const Cart = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [productId, setProductId] = useState<number | null>(null);

  return (
    <div>
      <Navbar />
      <div className="mt-6">
        <h1 className="text-center text-4xl font-bold">Your Cart</h1>

        <div>
          {products.length === 0 ? (
            <p className="text-center text-xl">Your cart is empty</p>
          ) : (
            products?.map((product) => (
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
