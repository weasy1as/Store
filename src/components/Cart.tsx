"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Card from "./Card";
import CheckoutButton from "./CheckoutButton";

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
  quantity: number; // New quantity field
}

const Cart = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const savedCart: { id: number; quantity: number }[] = JSON.parse(
      localStorage.getItem("CartItems") || "[]"
    );

    if (savedCart.length > 0) {
      const fetchProducts = async () => {
        try {
          const productRequests = savedCart.map(({ id }) =>
            fetch(`https://fakestoreapi.com/products/${id}`).then((res) =>
              res.json()
            )
          );

          const productsData = await Promise.all(productRequests);

          // ✅ Attach quantity to products
          const updatedProducts = productsData.map((product) => ({
            ...product,
            quantity:
              savedCart.find((item) => item.id === product.id)?.quantity || 1,
          }));

          setProducts(updatedProducts);
        } catch (error) {
          console.error("Failed to fetch products", error);
        }
      };

      fetchProducts();
    }
  }, []);

  // ✅ Calculate total price correctly
  const totalPrice = products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const handleRemove = (id: number) => {
    let cartItems: number[] = JSON.parse(
      localStorage.getItem("CartItems") || "[]"
    );

    cartItems = cartItems.filter((item) => item !== id);
    localStorage.setItem("CartItems", JSON.stringify(cartItems));

    setProducts((prevProducts) =>
      prevProducts
        .map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
        .filter((product) => product.quantity > 0)
    );

    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div>
      <Navbar />
      <div className="w-full mt-10 p-6">
        <h1 className="text-center text-4xl font-bold mb-6">Your Cart</h1>

        <div className="flex flex-col gap-3 items-center">
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
                    quantity={product.quantity} // Pass quantity to the card
                    onRemove={handleRemove}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="w-[80%] bg-gray-100 p-6 rounded-lg shadow-lg h-fit">
            <h2 className="text-2xl font-bold mb-4 text-center">Checkout</h2>
            <div className="flex justify-between text-2xl font-semibold mb-4">
              <span>Total Price:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-2xl font-semibold mb-4">
              <span>Coupon code:</span>
              <input type="text" className="shadow-xl rounded-md p-1" />
            </div>

            <CheckoutButton cartItems={products} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
