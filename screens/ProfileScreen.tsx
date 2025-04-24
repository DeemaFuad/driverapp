import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import {
  UserCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  PencilIcon,
  BellIcon,
  ShieldCheckIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
} from 'react-native-heroicons/outline';
import { useAuth } from '../contexts/AuthContext';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProfileTab'>;

// Mock driver data
const MOCK_DRIVER = {
  id: '1',
  name: 'John Smith',
  phone: '+1 234-567-8900',
  email: 'john.smith@example.com',
  address: '123 Main St, City, State 12345',
  avatar: null,
  rating: 4.8,
  totalDeliveries: 156,
  totalEarnings: 2345.67,
  isAvailable: true,
  notificationsEnabled: true,
};

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { signOut } = useAuth();
  const [isAvailable, setIsAvailable] = useState(MOCK_DRIVER.isAvailable);
  const [notificationsEnabled, setNotificationsEnabled] = useState(MOCK_DRIVER.notificationsEnabled);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            signOut();
          },
        },
      ]
    );
  };

  const handleEditProfile = () => {
    // Navigate to edit profile screen
    navigation.navigate('EditProfile');
  };

  const renderSettingItem = (
    icon: React.ReactNode,
    title: string,
    value?: string,
    onPress?: () => void,
    rightElement?: React.ReactNode
  ) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingIcon}>{icon}</View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {value && <Text style={styles.settingValue}>{value}</Text>}
      </View>
      {rightElement}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {MOCK_DRIVER.avatar ? (
          <Image source={{ uri: MOCK_DRIVER.avatar }} style={styles.avatar} />
        ) : (
          <UserCircleIcon size={80} color="#6B7280" />
        )}
        <Text style={styles.name}>{MOCK_DRIVER.name}</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{MOCK_DRIVER.rating}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{MOCK_DRIVER.totalDeliveries}</Text>
            <Text style={styles.statLabel}>Deliveries</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>${MOCK_DRIVER.totalEarnings.toFixed(2)}</Text>
            <Text style={styles.statLabel}>Earnings</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        {renderSettingItem(
          <PhoneIcon size={24} color="#6B7280" />,
          'Phone',
          MOCK_DRIVER.phone
        )}
        {renderSettingItem(
          <EnvelopeIcon size={24} color="#6B7280" />,
          'Email',
          MOCK_DRIVER.email
        )}
        {renderSettingItem(
          <MapPinIcon size={24} color="#6B7280" />,
          'Address',
          MOCK_DRIVER.address
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        {renderSettingItem(
          <PencilIcon size={24} color="#6B7280" />,
          'Edit Profile',
          undefined,
          handleEditProfile
        )}
        {renderSettingItem(
          <BellIcon size={24} color="#6B7280" />,
          'Notifications',
          undefined,
          undefined,
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#D1D5DB', true: '#34D399' }}
            thumbColor={notificationsEnabled ? '#10B981' : '#9CA3AF'}
          />
        )}
        {renderSettingItem(
          <ShieldCheckIcon size={24} color="#6B7280" />,
          'Privacy & Security',
          undefined,
          () => navigation.navigate('Privacy')
        )}
        {renderSettingItem(
          <QuestionMarkCircleIcon size={24} color="#6B7280" />,
          'Help & Support',
          undefined,
          () => navigation.navigate('Support')
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Availability</Text>
        {renderSettingItem(
          <View style={[styles.statusDot, { backgroundColor: isAvailable ? '#10B981' : '#EF4444' }]} />,
          'Available for Deliveries',
          undefined,
          undefined,
          <Switch
            value={isAvailable}
            onValueChange={setIsAvailable}
            trackColor={{ false: '#D1D5DB', true: '#34D399' }}
            thumbColor={isAvailable ? '#10B981' : '#9CA3AF'}
          />
        )}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <ArrowRightOnRectangleIcon size={24} color="#EF4444" style={styles.logoutIcon} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#E5E7EB',
  },
  section: {
    backgroundColor: 'white',
    marginTop: 16,
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  settingIcon: {
    width: 40,
    alignItems: 'center',
  },
  settingContent: {
    flex: 1,
    marginLeft: 12,
  },
  settingTitle: {
    fontSize: 16,
    color: '#111827',
  },
  settingValue: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop: 16,
    marginBottom: 32,
    padding: 16,
    borderRadius: 8,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
});

export default ProfileScreen; 