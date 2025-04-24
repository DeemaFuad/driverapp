import { DeliveryDetails } from '../types/delivery';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const getDeliveryDetails = async (deliveryId: string): Promise<DeliveryDetails> => {
  try {
    const response = await axios.get<DeliveryDetails>(`${API_BASE_URL}/deliveries/${deliveryId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch delivery details');
    }
    throw error;
  }
};

export const updateDeliveryStatus = async (
  deliveryId: string, 
  status: DeliveryDetails['status']
): Promise<DeliveryDetails> => {
  try {
    const response = await axios.patch<DeliveryDetails>(
      `${API_BASE_URL}/deliveries/${deliveryId}`,
      { status }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to update delivery status');
    }
    throw error;
  }
}; 