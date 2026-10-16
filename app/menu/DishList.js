
"use client";

import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/components/CartProvider";

export default function DishList({ dishes }) {
  const { cart, addToCart, removeFromCart } =
    useContext(CartContext);

  return (
    <div className="dishes">
      {dishes.map((dish) => {
        const isInCart = cart.some(
          (item) => item.id === dish.id
        );

        return (
          <div key={dish.id} className="dish-card">
            <h2>{dish.name}</h2>
            <p>{dish.description}</p>
            <p>{dish.price} ETB</p>

            <button
              onClick={() =>
                isInCart
                  ? removeFromCart(dish.id)
                  : addToCart(dish)
              }
            >
              {isInCart ? "Remove from Cart" : "Add to Cart"}
            </button>

            <p>
              <Link href={`/menu/${dish.id}`}>
                View Details
              </Link>
            </p>
          </div>
        );
      })}
    </div>
  );
}
