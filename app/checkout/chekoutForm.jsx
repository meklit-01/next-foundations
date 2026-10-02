"use client";

import { useState } from "react";

const initialState = {
  success: false,
  fieldErrors: {},
  message: "",
};

export default function CheckoutForm() {
  const [state, setState] = useState(initialState);
  const [pending, setPending] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    setPending(true);

    const formData = new FormData(event.target);

    const name = formData.get("name")?.toString().trim();
    const phone = formData.get("phone")?.toString().trim();
    const area = formData.get("area")?.toString().trim();
    const notes = formData.get("notes")?.toString().trim();

    const fieldErrors = {};

    if (!name) {
      fieldErrors.name = "Name is required.";
    }

    if (!phone) {
      fieldErrors.phone = "Phone is required.";
    }

    if (!area) {
      fieldErrors.area = "Area is required.";
    }

    if (Object.keys(fieldErrors).length > 0) {
      setState({
        success: false,
        fieldErrors,
        message: "Please fix the errors.",
      });

      setPending(false);
      return;
    }

    const newOrder = {
      id: Date.now().toString(),
      name,
      phone,
      area,
      notes,
    };

    const existingOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, newOrder])
    );

    setState({
      success: true,
      fieldErrors: {},
      message: "Order placed successfully!",
    });

    event.target.reset();
    setPending(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" />

        {state.fieldErrors?.name && (
          <p>{state.fieldErrors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="0912345678"
        />

        {state.fieldErrors?.phone && (
          <p>{state.fieldErrors.phone}</p>
        )}
      </div>

      <div>
        <label htmlFor="area">Area</label>
        <input id="area" name="area" type="text" />

        {state.fieldErrors?.area && (
          <p>{state.fieldErrors.area}</p>
        )}
      </div>

      <div>
        <label htmlFor="notes">Notes</label>
        <textarea id="notes" name="notes" />
      </div>

      {state.message && <p>{state.message}</p>}

      <button type="submit" disabled={pending}>
        {pending ? "Placing Order..." : "Place Order"}
      </button>
    </form>
  );
}