"use client";
import React, { useEffect, useState } from "react";
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
  let price = 0;

  for (let index = 0; index < products.length; index++) {
    price = price + products[index].price;
  }

  useEffect(() => {
    const savedProductIds: number[] = JSON.parse(
      localStorage.getItem("CartItems") || "[]"
    );

    if (savedProductIds.length > 0) {
      const fetchProducts = async () => {
        try {
          const productRequests = savedProductIds.map((id) =>
            fetch(`https://fakestoreapi.com/products/${id}`).then((res) =>
              res.json()
            )
          );

          const productsData = await Promise.all(productRequests);
          setProducts(productsData);
        } catch (error) {
          console.error("Failed to fetch products", error);
        }
      };

      fetchProducts();
    }
  }, []);

  const handleRemove = (id: number) => {
    let cartItems: number[] = JSON.parse(
      localStorage.getItem("CartItems") || "[]"
    );
    cartItems = cartItems.filter((item) => item !== id);
    localStorage.setItem("CartItems", JSON.stringify(cartItems));

    setProducts(products.filter((product) => product.id !== id));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div>
      <Navbar />
      <div className="mt-10 p-6">
        <h1 className="text-center text-4xl font-bold mb-6">Your Cart</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
            {products.length === 0 ? (
              <p className="text-center text-xl text-gray-500">
                Your cart is empty
              </p>
            ) : (
              <div className="flex flex-wrap gap-6 justify-center">
                {products.map((product) => (
                  <Card
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    description={product.description}
                    image={product.image}
                    rating={product.rating.rate}
                    count={product.rating.count}
                    isCartPage={true}
                    price={product.price}
                    onRemove={handleRemove}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-lg h-fit">
            <h2 className="text-2xl font-bold mb-4 text-center">Checkout</h2>
            <div className="flex justify-between text-2xl font-semibold mb-4">
              <span>Total Price:</span>
              <span>${price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-2xl font-semibold mb-4">
              <span>Coupon code:</span>
              <input
                type="text"
                name=""
                id=""
                className="shadow-xl rounded-md p-1"
              />
            </div>
            <button className="w-full bg-black text-xl text-white py-3 rounded-lg hover:bg-gray-800 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
