export interface DeliveryItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export type DeliveryStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface DeliveryDetails {
  id: string;
  status: DeliveryStatus;
  pickupAddress: string;
  dropoffAddress: string;
  customerName: string;
  customerPhone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  driverName?: string;
  driverPhone?: string;
  estimatedDeliveryTime?: string;
  items: DeliveryItem[];
  totalAmount: number;
  deliveryDate: string;
  createdAt: string;
  updatedAt: string;
} 