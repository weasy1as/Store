"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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
  quantity: number; // New quantity field
}

const Success = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams?.get("session_id");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    if (session_id) {
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
      setTimeout(() => setLoading(false), 2000);
      localStorage.removeItem("CartItems");
    }
  }, [session_id]);

  return (
    <div className="text-center mt-10">
      {loading ? (
        <p>Processing your order...</p>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-green-500">
            Payment Successful! 🎉
          </h1>
          <div className="flex flex-col gap-5 my-8">
            <h1 className="text-4xl font-bold text-center">
              Here is your order:
            </h1>
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
                />
              ))}
            </div>
          </div>

          <p>Thank you for your purchase.</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
          >
            Go Home
          </button>
        </>
      )}
    </div>
  );
};

export default Success;
