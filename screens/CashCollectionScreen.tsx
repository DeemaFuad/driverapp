import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { CurrencyDollarIcon, CheckCircleIcon } from 'react-native-heroicons/outline';

type CashCollectionScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CashCollection'>;

// Mock data for cash collections
const MOCK_COLLECTIONS = [
  {
    id: '1',
    deliveryId: '1',
    amount: 25.99,
    status: 'pending',
    dueDate: '2024-03-20',
    customerName: 'John Doe',
    customerPhone: '+1 234-567-8900',
  },
  {
    id: '2',
    deliveryId: '2',
    amount: 31.98,
    status: 'collected',
    dueDate: '2024-03-19',
    customerName: 'Jane Smith',
    customerPhone: '+1 234-567-8901',
    collectedAt: '2024-03-19T15:30:00Z',
  },
  {
    id: '3',
    deliveryId: '3',
    amount: 49.99,
    status: 'overdue',
    dueDate: '2024-03-18',
    customerName: 'Bob Wilson',
    customerPhone: '+1 234-567-8902',
  },
];

const CashCollectionScreen = () => {
  const navigation = useNavigation<CashCollectionScreenNavigationProp>();
  const [collections, setCollections] = useState(MOCK_COLLECTIONS);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCollections = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCollections(MOCK_COLLECTIONS);
      setLoading(false);
      setRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchCollections();
  };

  const handleMarkAsCollected = (collection: any) => {
    Alert.alert(
      'Mark as Collected',
      `Are you sure you want to mark collection #${collection.id} as collected?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            // Mock update
            setCollections(prevCollections =>
              prevCollections.map(c =>
                c.id === collection.id
                  ? { ...c, status: 'collected', collectedAt: new Date().toISOString() }
                  : c
              )
            );
            Alert.alert('Success', 'Collection marked as collected!');
          },
        },
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#F59E0B';
      case 'collected':
        return '#10B981';
      case 'overdue':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'collected':
        return 'Collected';
      case 'overdue':
        return 'Overdue';
      default:
        return 'Unknown';
    }
  };

  const getSummary = () => {
    const total = collections.reduce((sum, c) => sum + c.amount, 0);
    const collected = collections
      .filter(c => c.status === 'collected')
      .reduce((sum, c) => sum + c.amount, 0);
    const pending = collections
      .filter(c => c.status === 'pending')
      .reduce((sum, c) => sum + c.amount, 0);
    const overdue = collections
      .filter(c => c.status === 'overdue')
      .reduce((sum, c) => sum + c.amount, 0);

    return { total, collected, pending, overdue };
  };

  const renderCollectionItem = ({ item }: { item: any }) => (
    <View style={styles.collectionItem}>
      <View style={styles.collectionHeader}>
        <Text style={styles.collectionId}>Collection #{item.id}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
      </View>

      <View style={styles.amountContainer}>
        <CurrencyDollarIcon size={20} color="#6B7280" />
        <Text style={styles.amount}>${item.amount.toFixed(2)}</Text>
      </View>

      <View style={styles.customerContainer}>
        <Text style={styles.customerName}>{item.customerName}</Text>
        <Text style={styles.dueDate}>Due: {new Date(item.dueDate).toLocaleDateString()}</Text>
      </View>

      {item.status !== 'collected' && (
        <TouchableOpacity
          style={styles.collectButton}
          onPress={() => handleMarkAsCollected(item)}
        >
          <CheckCircleIcon size={20} color="white" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Mark as Collected</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const summary = getSummary();

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total</Text>
          <Text style={styles.summaryValue}>${summary.total.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Collected</Text>
          <Text style={[styles.summaryValue, { color: '#10B981' }]}>
            ${summary.collected.toFixed(2)}
          </Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Pending</Text>
          <Text style={[styles.summaryValue, { color: '#F59E0B' }]}>
            ${summary.pending.toFixed(2)}
          </Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Overdue</Text>
          <Text style={[styles.summaryValue, { color: '#EF4444' }]}>
            ${summary.overdue.toFixed(2)}
          </Text>
        </View>
      </View>

      <FlatList
        data={collections}
        renderItem={renderCollectionItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <CurrencyDollarIcon size={48} color="#9CA3AF" />
            <Text style={styles.emptyText}>No collections found</Text>
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
  summaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  summaryItem: {
    width: '50%',
    padding: 8,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  listContainer: {
    padding: 16,
  },
  collectionItem: {
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
  collectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  collectionId: {
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
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginLeft: 8,
  },
  customerContainer: {
    marginBottom: 12,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  dueDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  collectButton: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
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

export default CashCollectionScreen; 