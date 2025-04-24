import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { TruckIcon, MapPinIcon, PhoneIcon } from 'react-native-heroicons/outline';

type DeliveriesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Deliveries'>;

// Mock data for deliveries
const MOCK_DELIVERIES = [
  {
    id: '1',
    status: 'pending',
    pickupAddress: '123 Main St, City',
    dropoffAddress: '456 Oak Ave, City',
    customerName: 'John Doe',
    customerPhone: '+1 234-567-8900',
    estimatedDeliveryTime: '2024-03-20T14:30:00Z',
  },
  {
    id: '2',
    status: 'in_progress',
    pickupAddress: '789 Pine St, City',
    dropoffAddress: '321 Elm St, City',
    customerName: 'Jane Smith',
    customerPhone: '+1 234-567-8901',
    driverName: 'Mike Johnson',
    driverPhone: '+1 234-567-8902',
    estimatedDeliveryTime: '2024-03-20T15:00:00Z',
  },
  {
    id: '3',
    status: 'completed',
    pickupAddress: '555 Maple Dr, City',
    dropoffAddress: '777 Cedar Ln, City',
    customerName: 'Bob Wilson',
    customerPhone: '+1 234-567-8903',
    driverName: 'Sarah Davis',
    driverPhone: '+1 234-567-8904',
    estimatedDeliveryTime: '2024-03-20T16:00:00Z',
  },
];

const DeliveriesScreen = () => {
  const navigation = useNavigation<DeliveriesScreenNavigationProp>();
  const [deliveries, setDeliveries] = useState(MOCK_DELIVERIES);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDeliveries = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setDeliveries(MOCK_DELIVERIES);
      setLoading(false);
      setRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDeliveries();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#F59E0B';
      case 'in_progress':
        return '#3B82F6';
      case 'completed':
        return '#10B981';
      case 'cancelled':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  const renderDeliveryItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.deliveryItem}
      onPress={() => navigation.navigate('DeliveryDetails', { deliveryId: item.id })}
    >
      <View style={styles.deliveryHeader}>
        <Text style={styles.deliveryId}>Delivery #{item.id}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
      </View>

      <View style={styles.addressContainer}>
        <MapPinIcon size={20} color="#6B7280" />
        <View style={styles.addressDetails}>
          <Text style={styles.addressLabel}>Pickup:</Text>
          <Text style={styles.addressText}>{item.pickupAddress}</Text>
          <Text style={styles.addressLabel}>Dropoff:</Text>
          <Text style={styles.addressText}>{item.dropoffAddress}</Text>
        </View>
      </View>

      <View style={styles.customerContainer}>
        <Text style={styles.customerName}>{item.customerName}</Text>
        <View style={styles.phoneContainer}>
          <PhoneIcon size={16} color="#6B7280" />
          <Text style={styles.phoneText}>{item.customerPhone}</Text>
        </View>
      </View>

      {item.status === 'in_progress' && (
        <View style={styles.driverContainer}>
          <Text style={styles.driverLabel}>Driver:</Text>
          <Text style={styles.driverName}>{item.driverName}</Text>
          <View style={styles.phoneContainer}>
            <PhoneIcon size={16} color="#6B7280" />
            <Text style={styles.phoneText}>{item.driverPhone}</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={deliveries}
        renderItem={renderDeliveryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <TruckIcon size={48} color="#9CA3AF" />
            <Text style={styles.emptyText}>No deliveries found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
  },
  deliveryItem: {
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
  deliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  deliveryId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  addressContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  addressDetails: {
    marginLeft: 8,
    flex: 1,
  },
  addressLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  addressText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
  customerContainer: {
    marginBottom: 8,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  driverContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 8,
    marginTop: 8,
  },
  driverLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  driverName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 8,
  },
});

export default DeliveriesScreen; 