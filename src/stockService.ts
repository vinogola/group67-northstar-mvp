export interface StockItem {
  id: string;
  name: string;
  quantity: number;
}

export function isInStock(item: StockItem): boolean {
  return item.quantity > 0;
}

export function hasEnoughStock(
  item: StockItem,
  requestedQuantity: number
): boolean {
  return item.quantity >= requestedQuantity;
}

export function getStockStatus(
  quantity: number
): "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK" {
  if (quantity <= 0) {
    return "OUT_OF_STOCK";
  }

  if (quantity <= 5) {
    return "LOW_STOCK";
  }

  return "IN_STOCK";
}
export function reduceStock(
  item: StockItem,
  quantity: number
): StockItem {
  if (quantity <= 0) {
    throw new Error('Quantity must be greater than zero. ');
  }

  return {
    ...item,
    quantity: item.quantity - quantity,
  };
}
// Products used in the Northstar app
export const STOCK_ITEMS: StockItem[] = [
  {
    id: 'item-1',
    name: 'Merino Wool Crewneck Sweater (Navy - M)',
    quantity: 10,
  },
  {
    id: 'item-2',
    name: 'Everyday Canvas Tote Bag',
    quantity: 8,
  },
  {
    id: 'item-3',
    name: 'Waterproof Trail Hiking Boots (Size 10.5)',
    quantity: 4,
  },
  {
    id: 'item-4',
    name: 'Thermal Moisture-Wicking Socks (3-Pack)',
    quantity: 12,
  },
  {
    id: 'item-5',
    name: 'Wireless Noise-Cancelling Headphones',
    quantity: 3,
  },
  {
    id: 'item-6',
    name: 'Ergonomic Desk Chair Mesh Lumbar',
    quantity: 6,
  },
  {
    id: 'item-7',
    name: 'Ceramic Pour-Over Coffee Maker',
    quantity: 0,
  },
  {
    id: 'item-8',
    name: 'Artisan Roast Single-Origin Coffee Beans (12oz)',
    quantity: 15,
  },
];

