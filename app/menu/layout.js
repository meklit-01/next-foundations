"use client";

import { useState } from "react";

export default function MenuLayout({ children }) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <main>
        {children}
      </main>
    </div>
  );
}