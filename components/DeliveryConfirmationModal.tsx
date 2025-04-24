import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { CameraIcon, XMarkIcon } from 'react-native-heroicons/outline';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

interface DeliveryConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (imageUri: string) => Promise<void>;
  deliveryId: string;
}

const DeliveryConfirmationModal = ({
  visible,
  onClose,
  onConfirm,
  deliveryId,
}: DeliveryConfirmationModalProps) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTakePhoto = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (result.assets && result.assets[0]?.uri) {
      setImage(result.assets[0].uri);
    }
  };

  const handleChoosePhoto = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (result.assets && result.assets[0]?.uri) {
      setImage(result.assets[0].uri);
    }
  };

  const handleConfirm = async () => {
    if (!image) return;
    
    setLoading(true);
    try {
      await onConfirm(image);
      setImage(null);
      onClose();
    } catch (error) {
      console.error('Error confirming delivery:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Confirm Delivery</Text>
            <TouchableOpacity onPress={onClose}>
              <XMarkIcon size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <Text style={styles.deliveryId}>Order #{deliveryId}</Text>

          {image ? (
            <View style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.image} />
              <TouchableOpacity
                style={styles.retakeButton}
                onPress={handleTakePhoto}
              >
                <Text style={styles.retakeButtonText}>Retake Photo</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.photoOptions}>
              <TouchableOpacity
                style={styles.photoButton}
                onPress={handleTakePhoto}
              >
                <CameraIcon size={24} color="#fff" />
                <Text style={styles.photoButtonText}>Take Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.photoButton, styles.chooseButton]}
                onPress={handleChoosePhoto}
              >
                <Text style={styles.photoButtonText}>Choose from Gallery</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.confirmButton,
              (!image || loading) && styles.disabledButton
            ]}
            onPress={handleConfirm}
            disabled={!image || loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.confirmButtonText}>
                Confirm Delivery
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: '50%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  deliveryId: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 20,
  },
  photoOptions: {
    gap: 12,
    marginBottom: 20,
  },
  photoButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  chooseButton: {
    backgroundColor: '#4CAF50',
  },
  photoButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  retakeButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F44336',
    alignItems: 'center',
  },
  retakeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DeliveryConfirmationModal; 