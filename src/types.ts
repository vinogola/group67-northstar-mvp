export type OrderStatusType = 'Processing' | 'Shipped' | 'Delivered' | 'Delayed' | 'Out for Delivery';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: string;
  imageUrl?: string;
}

export interface OrderTimelineEvent {
  step: string;
  date: string;
  completed: boolean;
  current: boolean;
  description?: string;
}

export interface OrderData {
  orderId: string;
  customerName: string;
  orderDate: string;
  status: OrderStatusType;
  statusHeadline: string;
  statusDetail: string; // The one-line detail required by Northstar prompt
  estimatedDelivery: string;
  carrier?: string;
  trackingNumber?: string;
  shippingAddress: string;
  items: OrderItem[];
  timeline: OrderTimelineEvent[];
}
