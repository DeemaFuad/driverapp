import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { MapPinIcon, CheckCircleIcon, XCircleIcon } from 'react-native-heroicons/outline';
import Constants from 'expo-constants';
import DeliveryConfirmationModal from '../components/DeliveryConfirmationModal';
import { DeliveryDetails } from '../types/delivery';

const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL || 'http://192.168.100.120:5000/api';

// Mock driver ID - in a real app, this would come from authentication
const MOCK_DRIVER_ID = 'driver123';

// Mock data for deliveries
const MOCK_DELIVERIES: DeliveryDetails[] = [
  {
    id: '1',
    status: 'pending',
    pickupAddress: '123 Main St, City',
    dropoffAddress: '456 Oak Ave, City',
    customerName: 'John Doe',
    customerPhone: '555-123-4567',
    address: {
      street: '456 Oak Ave',
      city: 'City',
      state: 'CA',
      zipCode: '90210',
    },
    items: [
      { id: '1', name: 'Package 1', quantity: 1, price: 25.99 },
    ],
    totalAmount: 25.99,
    deliveryDate: '2023-06-15',
    createdAt: '2023-06-14T10:00:00Z',
    updatedAt: '2023-06-14T10:00:00Z',
  },
  {
    id: '2',
    status: 'in_progress',
    pickupAddress: '789 Pine St, City',
    dropoffAddress: '321 Elm St, City',
    customerName: 'Jane Smith',
    customerPhone: '555-987-6543',
    address: {
      street: '321 Elm St',
      city: 'City',
      state: 'CA',
      zipCode: '90210',
    },
    items: [
      { id: '2', name: 'Package 2', quantity: 2, price: 15.99 },
    ],
    totalAmount: 31.98,
    deliveryDate: '2023-06-15',
    createdAt: '2023-06-14T11:00:00Z',
    updatedAt: '2023-06-14T11:00:00Z',
  },
  {
    id: '3',
    status: 'completed',
    pickupAddress: '555 Maple Dr, City',
    dropoffAddress: '777 Cedar Ln, City',
    customerName: 'Bob Johnson',
    customerPhone: '555-555-5555',
    address: {
      street: '777 Cedar Ln',
      city: 'City',
      state: 'CA',
      zipCode: '90210',
    },
    items: [
      { id: '3', name: 'Package 3', quantity: 1, price: 49.99 },
    ],
    totalAmount: 49.99,
    deliveryDate: '2023-06-14',
    createdAt: '2023-06-13T09:00:00Z',
    updatedAt: '2023-06-14T15:00:00Z',
  },
];

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [deliveries, setDeliveries] = useState<DeliveryDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryDetails | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchDeliveries = useCallback(async () => {
    try {
      setLoading(true);
      
      // Use mock data instead of API call
      // Comment this out and uncomment the API call when backend is ready
      /*
      const response = await fetch(`${API_BASE_URL}/driver/${MOCK_DRIVER_ID}/deliveries`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch deliveries');
      }
      
      const data = await response.json();
      setDeliveries(data);
      */
      
      // Use mock data
      setTimeout(() => {
        setDeliveries(MOCK_DELIVERIES);
        setLoading(false);
        setRefreshing(false);
      }, 1000); // Simulate network delay
      
    } catch (error) {
      console.error('Error fetching deliveries:', error);
      Alert.alert('Error', 'Failed to load deliveries. Please try again.');
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDeliveries();
  }, [fetchDeliveries]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchDeliveries();
  }, [fetchDeliveries]);

  const handleMarkAsDelivered = (delivery: DeliveryDetails) => {
    setSelectedDelivery(delivery);
    setIsModalVisible(true);
  };

  const handleConfirmDelivery = async (imageUri: string) => {
    if (!selectedDelivery) return;
    
    try {
      // Use mock update instead of API call
      // Comment this out and uncomment the API call when backend is ready
      /*
      const response = await fetch(`${API_BASE_URL}/deliveries/${selectedDelivery.id}/confirm`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'completed',
          proofImage: imageUri,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update delivery status');
      }
      */
      
      // Mock update
      setDeliveries(prevDeliveries => 
        prevDeliveries.map(d => 
          d.id === selectedDelivery.id 
            ? { ...d, status: 'completed' as const, updatedAt: new Date().toISOString() } 
            : d
        )
      );
      
      // Refresh the deliveries list
      fetchDeliveries();
      setIsModalVisible(false);
      setSelectedDelivery(null);
      
      Alert.alert('Success', 'Delivery marked as completed!');
    } catch (error) {
      console.error('Error updating delivery:', error);
      Alert.alert('Error', 'Failed to update delivery status. Please try again.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#4CAF50';
      case 'in_progress': return '#2196F3';
      case 'cancelled': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in_progress': return 'In Progress';
      case 'cancelled': return 'Cancelled';
      default: return 'Pending';
    }
  };

  const completedDeliveries = deliveries.filter(d => d.status === 'completed').length;
  const pendingDeliveries = deliveries.filter(d => d.status !== 'completed').length;

  const renderDeliveryItem = ({ item }: { item: DeliveryDetails }) => {
    const isCompleted = item.status === 'completed';
    
    return (
      <View style={[
        styles.deliveryItem,
        isCompleted ? styles.completedItem : null
      ]}>
        <View style={styles.deliveryHeader}>
          <Text style={styles.orderNumber}>Order #{item.id}</Text>
          <View style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) }
          ]}>
            <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
          </View>
        </View>

        <Text style={styles.recipientName}>{item.customerName}</Text>

        <View style={styles.addressContainer}>
          <MapPinIcon size={20} color="#4B5563" />
          <Text style={styles.address}>
            {`${item.address.street}, ${item.address.city}, ${item.address.state} ${item.address.zipCode}`}
          </Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => navigation.navigate('DeliveryDetails', { deliveryId: item.id })}
          >
            <Text style={styles.detailsButtonText}>View Details</Text>
          </TouchableOpacity>

          {!isCompleted && (
            <TouchableOpacity
              style={styles.deliverButton}
              onPress={() => handleMarkAsDelivered(item)}
            >
              <Text style={styles.deliverButtonText}>Mark as Delivered</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading deliveries...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{deliveries.length}</Text>
          <Text style={styles.summaryLabel}>Total Orders</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: '#4CAF50' }]}>{completedDeliveries}</Text>
          <Text style={styles.summaryLabel}>Completed</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: '#F44336' }]}>{pendingDeliveries}</Text>
          <Text style={styles.summaryLabel}>Remaining</Text>
        </View>
      </View>

      <FlatList
        data={deliveries}
        renderItem={renderDeliveryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#2196F3']}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No deliveries found</Text>
          </View>
        }
      />

      <DeliveryConfirmationModal
        visible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setSelectedDelivery(null);
        }}
        onConfirm={handleConfirmDelivery}
        deliveryId={selectedDelivery?.id || ''}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4B5563',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
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
  completedItem: {
    opacity: 0.8,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  deliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
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
  detailsButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
  },
  detailsButtonText: {
    color: '#4B5563',
    fontWeight: '600',
  },
  deliverButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  deliverButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
  },
});

export default HomeScreen; 