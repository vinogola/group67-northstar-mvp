/**
 * ============================================================================
 * NORTHSTAR RETAIL CO. - SUPPORT DEFLECTION MVP
 * ORDER STATUS LOOKUP LOGIC
 * ============================================================================
 * Task 3: Order-status logic (Vincent)
 * Given an order ID, returns the matching order's status data, or null if
 * nothing matches. The UI (Task 4, Owen) only ever calls lookupOrderStatus(),
 * it never touches this data directly, so this file is safe to extend on
 * its own.
 * ============================================================================
 */

import { OrderData } from "./types";

export const MOCK_ORDERS: Record<string, OrderData> = {
  "NS-10234": {
    orderId: "NS-10234",
    customerName: "Sarah Jenkins",
    orderDate: "Oct 23, 2026",
    status: "Processing",
    statusHeadline: "Your order is currently being prepared",
    statusDetail:
      "Items are being packed at our Central Logistics Hub. Estimated dispatch within 24 hours.",
    estimatedDelivery: "Mon, Oct 27 by 7:00 PM",
    carrier: "Standard Ground",
    trackingNumber: "TRK-9831042",
    shippingAddress: "452 Elm Street, Seattle, WA 98101",
    items: [
      {
        id: "item-1",
        name: "Merino Wool Crewneck Sweater (Navy - M)",
        quantity: 1,
        price: "$78.00",
      },
      {
        id: "item-2",
        name: "Everyday Canvas Tote Bag",
        quantity: 1,
        price: "$34.00",
      },
    ],
    timeline: [
      {
        step: "Order Placed",
        date: "Oct 23, 9:15 AM",
        completed: true,
        current: false,
      },
      {
        step: "Payment Verified",
        date: "Oct 23, 9:16 AM",
        completed: true,
        current: false,
      },
      {
        step: "Fulfillment & Packing",
        date: "In Progress",
        completed: false,
        current: true,
      },
      { step: "Shipped", date: "Pending", completed: false, current: false },
      {
        step: "Delivered",
        date: "Estimated Oct 27",
        completed: false,
        current: false,
      },
    ],
  },
  "NS-10892": {
    orderId: "NS-10892",
    customerName: "Marcus Vance",
    orderDate: "Oct 21, 2026",
    status: "Shipped",
    statusHeadline: "On the way with FedEx Express",
    statusDetail:
      "In transit from Denver, CO. Arriving on schedule Friday, Oct 24.",
    estimatedDelivery: "Fri, Oct 24 by 4:30 PM",
    carrier: "FedEx Express",
    trackingNumber: "FDX-774910284",
    shippingAddress: "1204 Pine Ridge Ave, Austin, TX 78704",
    items: [
      {
        id: "item-3",
        name: "Waterproof Trail Hiking Boots (Size 10.5)",
        quantity: 1,
        price: "$145.00",
      },
      {
        id: "item-4",
        name: "Thermal Moisture-Wicking Socks (3-Pack)",
        quantity: 2,
        price: "$28.00",
      },
    ],
    timeline: [
      {
        step: "Order Placed",
        date: "Oct 21, 11:30 AM",
        completed: true,
        current: false,
      },
      {
        step: "Packed & Dispatched",
        date: "Oct 22, 2:10 PM",
        completed: true,
        current: false,
      },
      {
        step: "In Transit",
        date: "Oct 23, 4:45 AM (Denver Hub)",
        completed: true,
        current: true,
      },
      {
        step: "Out for Delivery",
        date: "Expected Oct 24 morning",
        completed: false,
        current: false,
      },
      {
        step: "Delivered",
        date: "Estimated Oct 24 afternoon",
        completed: false,
        current: false,
      },
    ],
  },
  "NS-11402": {
    orderId: "NS-11402",
    customerName: "Elena Rostova",
    orderDate: "Oct 18, 2026",
    status: "Delivered",
    statusHeadline: "Delivered to front door / porch",
    statusDetail:
      "Package signed for and left safely at front entrance on Tuesday, Oct 21.",
    estimatedDelivery: "Delivered on Oct 21 at 2:14 PM",
    carrier: "UPS Ground",
    trackingNumber: "1Z9999999999999999",
    shippingAddress: "88 Berkley Terrace, Chicago, IL 60611",
    items: [
      {
        id: "item-5",
        name: "Wireless Noise-Cancelling Headphones",
        quantity: 1,
        price: "$199.00",
      },
    ],
    timeline: [
      {
        step: "Order Placed",
        date: "Oct 18, 4:00 PM",
        completed: true,
        current: false,
      },
      {
        step: "Shipped",
        date: "Oct 19, 9:00 AM",
        completed: true,
        current: false,
      },
      {
        step: "In Transit",
        date: "Oct 20, 1:20 PM",
        completed: true,
        current: false,
      },
      {
        step: "Out for Delivery",
        date: "Oct 21, 8:00 AM",
        completed: true,
        current: false,
      },
      {
        step: "Delivered",
        date: "Oct 21, 2:14 PM (Signed)",
        completed: true,
        current: true,
      },
    ],
  },
  "NS-12095": {
    orderId: "NS-12095",
    customerName: "David Chen",
    orderDate: "Oct 19, 2026",
    status: "Delayed",
    statusHeadline: "Carrier Delay: Weather disruption in Midwest hub",
    statusDetail:
      "Severe weather delayed regional transport in Chicago. New estimated delivery: Oct 28.",
    estimatedDelivery: "Revised to Tue, Oct 28 by 6:00 PM",
    carrier: "DHL Express",
    trackingNumber: "DHL-481903112",
    shippingAddress: "744 Beacon Blvd, Boston, MA 02116",
    items: [
      {
        id: "item-6",
        name: "Ergonomic Desk Chair Mesh Lumbar",
        quantity: 1,
        price: "$260.00",
      },
    ],
    timeline: [
      {
        step: "Order Placed",
        date: "Oct 19, 8:12 AM",
        completed: true,
        current: false,
      },
      {
        step: "Shipped",
        date: "Oct 20, 10:00 AM",
        completed: true,
        current: false,
      },
      {
        step: "In Transit (Weather Hold)",
        date: "Oct 22, 6:30 PM (Chicago)",
        completed: true,
        current: true,
      },
      {
        step: "Resumed Transit",
        date: "Expected Oct 26",
        completed: false,
        current: false,
      },
      {
        step: "Delivered",
        date: "Revised Oct 28",
        completed: false,
        current: false,
      },
    ],
  },
  "NS-12500": {
    orderId: "NS-12500",
    customerName: "Amina Diallo",
    orderDate: "Oct 22, 2026",
    status: "Out for Delivery",
    statusHeadline: "Out for delivery with local courier",
    statusDetail:
      "Courier is currently in your neighborhood. Expected arrival today by 4:00 PM.",
    estimatedDelivery: "Today by 4:00 PM",
    carrier: "Northstar Express Local",
    trackingNumber: "NSE-550182",
    shippingAddress: "310 Peachtree St NE, Atlanta, GA 30308",
    items: [
      {
        id: "item-7",
        name: "Ceramic Pour-Over Coffee Maker",
        quantity: 1,
        price: "$42.00",
      },
      {
        id: "item-8",
        name: "Artisan Roast Single-Origin Coffee Beans (12oz)",
        quantity: 2,
        price: "$36.00",
      },
    ],
    timeline: [
      {
        step: "Order Placed",
        date: "Oct 22, 7:00 AM",
        completed: true,
        current: false,
      },
      {
        step: "Dispatched from Local Hub",
        date: "Oct 23, 5:30 AM",
        completed: true,
        current: false,
      },
      {
        step: "Out for Delivery",
        date: "Oct 23, 8:45 AM (Driver on Route)",
        completed: true,
        current: true,
      },
      {
        step: "Delivered",
        date: "Pending arrival",
        completed: false,
        current: false,
      },
    ],
  },
  "NS-13010": {
    orderId: "NS-13010",
    customerName: "Priya Nair",
    orderDate: "Oct 24, 2026",
    status: "Processing",
    statusHeadline: "Order confirmed, awaiting fulfillment",
    statusDetail:
      "Payment cleared, items queued for picking at our East Coast warehouse.",
    estimatedDelivery: "Wed, Oct 29 by 6:00 PM",
    carrier: "Standard Ground",
    trackingNumber: "TRK-9902117",
    shippingAddress: "19 Maple Court, Raleigh, NC 27601",
    items: [
      {
        id: "item-9",
        name: "Stainless Steel Water Bottle (32oz)",
        quantity: 2,
        price: "$22.00",
      },
    ],
    timeline: [
      {
        step: "Order Placed",
        date: "Oct 24, 10:05 AM",
        completed: true,
        current: false,
      },
      {
        step: "Payment Verified",
        date: "Oct 24, 10:06 AM",
        completed: true,
        current: false,
      },
      {
        step: "Fulfillment & Packing",
        date: "Pending",
        completed: false,
        current: true,
      },
      { step: "Shipped", date: "Pending", completed: false, current: false },
      {
        step: "Delivered",
        date: "Estimated Oct 29",
        completed: false,
        current: false,
      },
    ],
  },
  "NS-13488": {
    orderId: "NS-13488",
    customerName: "Tomasz Kwiat",
    orderDate: "Oct 15, 2026",
    status: "Delivered",
    statusHeadline: "Delivered and signed for",
    statusDetail: "Left with concierge at building front desk on Oct 19.",
    estimatedDelivery: "Delivered on Oct 19 at 11:40 AM",
    carrier: "USPS Priority",
    trackingNumber: "9400111899223344556677",
    shippingAddress: "760 Riverside Dr, New York, NY 10032",
    items: [
      {
        id: "item-10",
        name: "Bluetooth Portable Speaker",
        quantity: 1,
        price: "$89.00",
      },
      {
        id: "item-11",
        name: "USB-C Charging Cable (6ft)",
        quantity: 1,
        price: "$12.00",
      },
    ],
    timeline: [
      {
        step: "Order Placed",
        date: "Oct 15, 1:20 PM",
        completed: true,
        current: false,
      },
      {
        step: "Shipped",
        date: "Oct 16, 9:00 AM",
        completed: true,
        current: false,
      },
      {
        step: "In Transit",
        date: "Oct 17, 3:00 PM",
        completed: true,
        current: false,
      },
      {
        step: "Out for Delivery",
        date: "Oct 19, 8:30 AM",
        completed: true,
        current: false,
      },
      {
        step: "Delivered",
        date: "Oct 19, 11:40 AM (Concierge)",
        completed: true,
        current: true,
      },
    ],
  },
};

/**
 * Given an order ID, returns the matching OrderData, or null if nothing
 * matches. Case- and whitespace-insensitive, " ns-10234 " and "NS-10234"
 * both resolve to the same order.
 */
export function lookupOrderStatus(orderId: string): OrderData | null {
  if (!orderId) return null;
  const sanitizedId = orderId.trim().toUpperCase();
  if (!sanitizedId) return null;
  return MOCK_ORDERS[sanitizedId] || null;
}

export const DEMO_ORDER_EXAMPLES = [
  { id: "NS-10234", label: "Processing", type: "found" },
  { id: "NS-10892", label: "Shipped", type: "found" },
  { id: "NS-11402", label: "Delivered", type: "found" },
  { id: "NS-12095", label: "Delayed", type: "found" },
  { id: "NS-13010", label: "Processing (new)", type: "found" },
  { id: "NS-13488", label: "Delivered (new)", type: "found" },
  { id: "NS-99999", label: "Missing ID (Test 404)", type: "missing" },
];
