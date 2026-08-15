import React, { useState } from "react";

type Product = {
  name: string;
  stock: number;
};

const products: Product[] = [
  { name: "Classic T-Shirt", stock: 24 },
  { name: "Running Shoes", stock: 8 },
  { name: "Denim Jacket", stock: 0 },
  { name: "School Backpack", stock: 15 },
];

export default function StockAvailability() {
  const [item, setItem] = useState("");
  const [result, setResult] = useState<Product | null>(null);
  const [checked, setChecked] = useState(false);

  const checkAvailability = () => {
    const found = products.find(
      (p) => p.name.toLowerCase() === item.trim().toLowerCase()
    );

    setResult(found || null);
    setChecked(true);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-2">Stock Availability</h2>
      <p className="text-gray-600 mb-4">
        Check whether an item is currently available.
      </p>

      <div className="flex gap-2">
        <input
          type="text"
          value={item}
          onChange={(e) => {
            setItem(e.target.value);
            setChecked(false);
          }}
          placeholder="Enter item name"
          className="flex-1 border rounded-lg px-3 py-2"
        />
        <button
          onClick={checkAvailability}
          className="rounded-lg px-4 py-2 font-semibold bg-blue-600 text-white"
        >
          Check
        </button>
      </div>

      {checked && result && (
        <div className="mt-4 border rounded-lg p-4">
          <h3 className="font-semibold">{result.name}</h3>
          {result.stock > 0 ? (
            <p className="text-green-700">Available ({result.stock} in stock)</p>
          ) : (
            <p className="text-red-700">Out of stock</p>
          )}
        </div>
      )}

      {checked && !result && (
        <div className="mt-4 border rounded-lg p-4">
          <p>Item not found. Please check the item name.</p>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-500">
        Availability results are designed for rapid customer self-service.
      </div>
    </div>
  );
}


