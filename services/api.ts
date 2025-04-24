import { DeliveryDetails } from '../types/delivery';
import Constants from 'expo-constants';

const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL || 'http://192.168.100.120:5000/api';

export const uploadDeliveryConfirmation = async (deliveryId: string, imageUri: string): Promise<DeliveryDetails> => {
  try {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'delivery-confirmation.jpg',
    } as any);

    const response = await fetch(`${API_BASE_URL}/deliveries/${deliveryId}/confirm`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload delivery confirmation');
    }

    return response.json();
  } catch (error) {
    console.error('Error uploading delivery confirmation:', error);
    throw error;
  }
}; 