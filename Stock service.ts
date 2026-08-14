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
): Stock {
  if (quantity <= 0) {
    throw new Error('Quantity must be
  greater than zero. ');
  }

  return {
    ...item,
    quantity: item.quantity - quantity,
  };
}
