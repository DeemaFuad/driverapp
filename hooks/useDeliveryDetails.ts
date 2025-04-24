import { useState, useEffect } from 'react';
import { DeliveryDetails } from '../types/delivery';
import { getDeliveryDetails } from '../services/deliveryService';

export const useDeliveryDetails = (deliveryId: string) => {
  const [delivery, setDelivery] = useState<DeliveryDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeliveryDetails = async () => {
      try {
        setLoading(true);
        const data = await getDeliveryDetails(deliveryId);
        setDelivery(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch delivery details');
        setDelivery(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveryDetails();
  }, [deliveryId]);

  return { delivery, loading, error };
}; 