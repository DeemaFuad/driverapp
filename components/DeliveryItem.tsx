import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MapPinIcon, CheckCircleIcon } from 'react-native-heroicons/outline';

interface DeliveryItemProps {
  delivery: {
    id: string;
    orderNumber: string;
    recipientName: string;
    address: string;
    status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  };
  onMarkDelivered: () => void;
}

const DeliveryItem = ({ delivery, onMarkDelivered }: DeliveryItemProps) => {
  const isCompleted = delivery.status === 'completed';

  return (
    <View style={[
      styles.container,
      isCompleted ? styles.completedContainer : null
    ]}>
      <View style={styles.header}>
        <Text style={styles.orderNumber}>Order #{delivery.orderNumber}</Text>
        {isCompleted && (
          <CheckCircleIcon size={24} color="#4CAF50" />
        )}
      </View>

      <Text style={styles.recipientName}>{delivery.recipientName}</Text>

      <View style={styles.addressContainer}>
        <MapPinIcon size={20} color="#4B5563" />
        <Text style={styles.address}>{delivery.address}</Text>
      </View>

      <View style={styles.footer}>
        <View style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(delivery.status) }
        ]}>
          <Text style={styles.statusText}>
            {delivery.status.charAt(0).toUpperCase() + delivery.status.slice(1)}
          </Text>
        </View>

        {!isCompleted && (
          <TouchableOpacity
            style={styles.button}
            onPress={onMarkDelivered}
          >
            <Text style={styles.buttonText}>Mark as Delivered</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return '#4CAF50';
    case 'in_progress': return '#2196F3';
    case 'cancelled': return '#F44336';
    default: return '#9E9E9E';
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completedContainer: {
    opacity: 0.8,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  recipientName: {
    fontSize: 18,
    marginBottom: 8,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  address: {
    marginLeft: 8,
    color: '#4B5563',
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default DeliveryItem; 