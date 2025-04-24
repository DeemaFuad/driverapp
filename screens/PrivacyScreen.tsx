import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import {
  ShieldCheckIcon,
  EyeIcon,
  MapPinIcon,
  DevicePhoneMobileIcon,
} from 'react-native-heroicons/outline';

type PrivacyScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Privacy'>;

const PrivacyScreen = () => {
  const navigation = useNavigation<PrivacyScreenNavigationProp>();
  const [settings, setSettings] = useState({
    locationSharing: true,
    profileVisibility: true,
    phoneNumberVisibility: false,
    activityStatus: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderSettingItem = (
    icon: React.ReactNode,
    title: string,
    description: string,
    value: boolean,
    onToggle: () => void
  ) => (
    <View style={styles.settingItem}>
      <View style={styles.settingIcon}>{icon}</View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#D1D5DB', true: '#34D399' }}
        thumbColor={value ? '#10B981' : '#9CA3AF'}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <ShieldCheckIcon size={48} color="#2196F3" />
        <Text style={styles.headerTitle}>Privacy Settings</Text>
        <Text style={styles.headerDescription}>
          Control who can see your information and how your data is used
        </Text>
      </View>

      <View style={styles.section}>
        {renderSettingItem(
          <MapPinIcon size={24} color="#6B7280" />,
          'Location Sharing',
          'Allow the app to access your location for deliveries',
          settings.locationSharing,
          () => toggleSetting('locationSharing')
        )}

        {renderSettingItem(
          <EyeIcon size={24} color="#6B7280" />,
          'Profile Visibility',
          'Make your profile visible to other users',
          settings.profileVisibility,
          () => toggleSetting('profileVisibility')
        )}

        {renderSettingItem(
          <DevicePhoneMobileIcon size={24} color="#6B7280" />,
          'Phone Number Visibility',
          'Show your phone number to customers',
          settings.phoneNumberVisibility,
          () => toggleSetting('phoneNumberVisibility')
        )}

        {renderSettingItem(
          <EyeIcon size={24} color="#6B7280" />,
          'Activity Status',
          'Show when you are online and available',
          settings.activityStatus,
          () => toggleSetting('activityStatus')
        )}
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Terms of Service</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Data Usage Policy</Text>
        </TouchableOpacity>
      </View>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  headerDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  section: {
    backgroundColor: 'white',
    marginTop: 16,
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
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
    fontWeight: '500',
    color: '#111827',
  },
  settingDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  button: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  buttonText: {
    fontSize: 16,
    color: '#2196F3',
    textAlign: 'center',
  },
});

export default PrivacyScreen; 