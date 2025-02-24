import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Card = ({
  id,
  title,
  description,
  image,
  rating,
  price,
  count,
  isCartPage,
  quantity,
  onRemove,
}: {
  id: number;
  title: string;
  description: string;
  image: string;
  rating: number;
  price: number;
  count: number;
  quantity?: number;
  isCartPage?: boolean;
  onRemove?: (id: number) => void;
}) => {
  const [addedId, setAddedId] = useState<Number | null>(null);

  const handleClick = (id: number) => {
    setAddedId(id);

    let cartItems: { id: number; quantity: number }[] = JSON.parse(
      localStorage.getItem("CartItems") || "[]"
    );

    // ✅ Check if the item is already in the cart
    const existingItem = cartItems.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity += 1; // Increase quantity
    } else {
      cartItems.push({ id, quantity: 1 }); // Add new item
    }

    localStorage.setItem("CartItems", JSON.stringify(cartItems));

    window.dispatchEvent(new Event("cartUpdated"));
    setTimeout(() => setAddedId(null), 3000);
  };

  // ✅ Decrease quantity
  const decreaseQuantity = (id: number) => {
    let cartItems: { id: number; quantity: number }[] = JSON.parse(
      localStorage.getItem("CartItems") || "[]"
    );

    const existingItem = cartItems.find((item) => item.id === id);
    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity -= 1;
    } else {
      cartItems = cartItems.filter((item) => item.id !== id); // Remove if quantity reaches 0
    }

    localStorage.setItem("CartItems", JSON.stringify(cartItems));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // ✅ Remove Button (Only for Cart Page)
  const handleRemoveClick = (id: number) => {
    let cartItems = JSON.parse(localStorage.getItem("CartItems") || "[]");
    cartItems = cartItems.filter((item: { id: number }) => item.id !== id);
    localStorage.setItem("CartItems", JSON.stringify(cartItems));

    onRemove?.(id);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const router = useRouter();

  const handlePush = (id: number) => {
    router.push(`/product/${id}`);
  };
  return (
    <div className="relative flex flex-col justify-between border-2 border-gray-400 w-[300px] h-[500px] px-6 pb-8 pt-6  border-l-4 border-accent bg-white shadow-lg rounded-lg hover:shadow-xl hover:scale-[1.03] transition-transform transform duration-200">
      <img
        src={image}
        alt=""
        className="w-[250px] h-[200px] object-contain cursor-pointer"
        onClick={() => handlePush(id)}
      />
      <div className="w-full">
        <h1 className="text-md font-extrabold ">{title}</h1>
        <p className="text-sm font-light">{description.slice(0, 30)}....</p>
        <p>
          Rating: {rating}({count})
        </p>
        <div className="w-full flex justify-between items-center">
          <p className="font-extrabold">Price: {price}</p>
          {isCartPage ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => decreaseQuantity(id)}
                className="bg-gray-300 px-2 rounded-md"
              >
                -
              </button>
              <span className="font-bold">{quantity}</span>
              <button
                onClick={() => handleClick(id)}
                className="bg-gray-300 px-2 rounded-md"
              >
                +
              </button>
              <button
                onClick={() => handleRemoveClick(id)}
                className="bg-red-500 p-2 rounded-xl text-white hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleClick(id)}
              className="bg-black p-2 rounded-xl text-white hover:bg-white hover:text-black hover:shadow-xl hover:border-black hover:border-2"
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
      {addedId == id ||
        (isCartPage == false && (
          <div className="bg-green-500 text-white text-sm font-bold py-1 px-4 rounded-lg shadow-md">
            Added to cart!
          </div>
        ))}
      <div className=" absolute top-0 right-4 font-bold text-3xl">
        {quantity}
      </div>
    </div>
  );
};

export default Card;
