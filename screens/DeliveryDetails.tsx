import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useDeliveryDetails } from '../hooks/useDeliveryDetails';
import DeliveryConfirmationModal from '../components/DeliveryConfirmationModal';
import { uploadDeliveryConfirmation } from '../services/api';
import { MapPinIcon, PhoneIcon, UserIcon } from 'react-native-heroicons/outline';

type Props = NativeStackScreenProps<RootStackParamList, 'DeliveryDetails'>;

const DeliveryDetails = ({ route, navigation }: Props) => {
  const { deliveryId } = route.params;
  const { delivery, loading, error } = useDeliveryDetails(deliveryId);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleConfirmDelivery = async (imageUri: string) => {
    try {
      await uploadDeliveryConfirmation(deliveryId, imageUri);
      Alert.alert(
        'Success',
        'Delivery confirmed successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('DeliveryList'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to confirm delivery. Please try again.');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error || !delivery) {
    return (
      <View style={styles.container}>
        <Text>Error loading delivery details</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.card}>
          <Text style={styles.title}>Order #{delivery.id}</Text>
          <Text style={styles.status}>Status: {delivery.status}</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Customer Details</Text>
            <View style={styles.infoRow}>
              <UserIcon size={20} color="#4B5563" />
              <Text style={styles.infoText}>{delivery.customerName}</Text>
            </View>
            <View style={styles.infoRow}>
              <PhoneIcon size={20} color="#4B5563" />
              <Text style={styles.infoText}>{delivery.customerPhone}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <View style={styles.infoRow}>
              <MapPinIcon size={20} color="#4B5563" />
              <Text style={styles.infoText}>
                {`${delivery.address.street}, ${delivery.address.city}, ${delivery.address.state} ${delivery.address.zipCode}`}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Items</Text>
            {delivery.items.map((item, index) => (
              <View key={index} style={styles.itemRow}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>x{item.quantity}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.confirmButtonText}>Confirm Delivery</Text>
        </TouchableOpacity>
      </View>

      <DeliveryConfirmationModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={handleConfirmDelivery}
        deliveryId={deliveryId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  card: {
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  status: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 16,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#4B5563',
    flex: 1,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  itemName: {
    fontSize: 16,
  },
  itemQuantity: {
    fontSize: 16,
    color: '#4B5563',
  },
  footer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DeliveryDetails; 