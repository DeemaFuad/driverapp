import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MapPinIcon, CubeIcon, ClockIcon } from 'react-native-heroicons/outline';

interface DeliveryCardProps {
  delivery: {
    id: string;
    pickupLocation: string;
    dropoffLocation: string;
    packageType: string;
    estimatedTime: string;
    status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  };
  onStart?: () => void;
  onComplete?: () => void;
}

const DeliveryCard = ({ delivery, onStart, onComplete }: DeliveryCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#F59E0B';
      case 'in_progress': return '#3B82F6';
      case 'completed': return '#10B981';
      case 'cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Delivery #{delivery.id}</Text>
        <View style={[styles.badge, { backgroundColor: getStatusColor(delivery.status) }]}>
          <Text style={styles.badgeText}>{delivery.status.replace('_', ' ')}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.row}>
          <MapPinIcon size={20} color="#4CAF50" />
          <Text style={styles.rowText}>Pickup: {delivery.pickupLocation}</Text>
        </View>
        
        <View style={styles.row}>
          <MapPinIcon size={20} color="#f44336" />
          <Text style={styles.rowText}>Dropoff: {delivery.dropoffLocation}</Text>
        </View>

        <View style={styles.row}>
          <CubeIcon size={20} color="#2196F3" />
          <Text style={styles.rowText}>Type: {delivery.packageType}</Text>
        </View>

        <View style={styles.row}>
          <ClockIcon size={20} color="#FF9800" />
          <Text style={styles.rowText}>ETA: {delivery.estimatedTime}</Text>
        </View>
      </View>

      {delivery.status === 'pending' && onStart && (
        <TouchableOpacity 
          onPress={onStart}
          style={[styles.button, styles.startButton]}
        >
          <Text style={styles.buttonText}>Start Delivery</Text>
        </TouchableOpacity>
      )}

      {delivery.status === 'in_progress' && onComplete && (
        <TouchableOpacity 
          onPress={onComplete}
          style={[styles.button, styles.completeButton]}
        >
          <Text style={styles.buttonText}>Complete Delivery</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    textTransform: 'capitalize',
  },
  content: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rowText: {
    marginLeft: 8,
    color: '#4B5563',
    flex: 1,
  },
  button: {
    marginTop: 16,
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  completeButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default DeliveryCard; 