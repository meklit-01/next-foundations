"use client";

import { useState } from "react";

export default function CancelButton({ orderId }) {
  const [message, setMessage] = useState("");

  function handleCancel() {
    const existingOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    const updatedOrders = existingOrders.filter(
      (order) => order.id !== orderId
    );

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );

    setMessage("Order cancelled.");
  }

  return (
    <div>
      <button onClick={handleCancel}>
        Cancel Order
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}