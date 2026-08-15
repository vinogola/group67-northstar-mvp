import React, { useState } from "react";
import { STOCK_ITEMS, getStockStatus, StockItem } from "./stockService";

const EXAMPLE_ITEMS = [
  { name: "Merino Wool Crewneck Sweater (Navy - M)", label: "in stock" },
  { name: "Waterproof Trail Hiking Boots (Size 10.5)", label: "low stock" },
  { name: "Ceramic Pour-Over Coffee Maker", label: "out of stock" },
  { name: "Winter Parka", label: "not found" },
];

export default function StockAvailability() {
  const [item, setItem] = useState("");
  const [result, setResult] = useState<StockItem | null>(null);
  const [checked, setChecked] = useState(false);

  const findItem = (name: string) =>
    STOCK_ITEMS.find((p) => p.name.toLowerCase() === name.trim().toLowerCase());

  const checkAvailability = () => {
    setResult(findItem(item) || null);
    setChecked(true);
  };

  const handleExampleClick = (name: string) => {
    setItem(name);
    setResult(findItem(name) || null);
    setChecked(true);
  };

  const statusText = (quantity: number) => {
    const status = getStockStatus(quantity);
    if (status === "OUT_OF_STOCK") return { text: "Out of stock", className: "text-red-700" };
    if (status === "LOW_STOCK") return { text: `Low stock (${quantity} left)`, className: "text-amber-600" };
    return { text: `Available (${quantity} in stock)`, className: "text-green-700" };
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

      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <span className="text-gray-500">Try:</span>
        {EXAMPLE_ITEMS.map((ex) => (
          <button
            key={ex.name}
            type="button"
            onClick={() => handleExampleClick(ex.name)}
            className="px-2 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            {ex.name} <span className="text-gray-400">({ex.label})</span>
          </button>
        ))}
      </div>

      {checked && result && (
        <div className="mt-4 border rounded-lg p-4">
          <h3 className="font-semibold">{result.name}</h3>
          <p className={statusText(result.quantity).className}>
            {statusText(result.quantity).text}
          </p>
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
