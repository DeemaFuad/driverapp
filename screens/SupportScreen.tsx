import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import {
  QuestionMarkCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleLeftIcon,
  DocumentTextIcon,
  GlobeAltIcon,
} from 'react-native-heroicons/outline';

type SupportScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Support'>;

const SupportScreen = () => {
  const navigation = useNavigation<SupportScreenNavigationProp>();

  const handleContactSupport = () => {
    Linking.openURL('mailto:support@driverapp.com');
  };

  const handleCallSupport = () => {
    Linking.openURL('tel:+1234567890');
  };

  const handleOpenFAQ = () => {
    // Navigate to FAQ screen or open FAQ in web view
  };

  const renderSupportItem = (
    icon: React.ReactNode,
    title: string,
    description: string,
    onPress: () => void
  ) => (
    <TouchableOpacity style={styles.supportItem} onPress={onPress}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <QuestionMarkCircleIcon size={48} color="#2196F3" />
        <Text style={styles.headerTitle}>Help & Support</Text>
        <Text style={styles.headerDescription}>
          Get help with your account, deliveries, or technical issues
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        {renderSupportItem(
          <PhoneIcon size={24} color="#6B7280" />,
          'Call Support',
          'Speak with our support team',
          handleCallSupport
        )}
        {renderSupportItem(
          <EnvelopeIcon size={24} color="#6B7280" />,
          'Email Support',
          'Send us an email',
          handleContactSupport
        )}
        {renderSupportItem(
          <ChatBubbleLeftIcon size={24} color="#6B7280" />,
          'Live Chat',
          'Chat with our support team',
          () => {}
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Help Center</Text>
        {renderSupportItem(
          <DocumentTextIcon size={24} color="#6B7280" />,
          'FAQs',
          'Find answers to common questions',
          handleOpenFAQ
        )}
        {renderSupportItem(
          <GlobeAltIcon size={24} color="#6B7280" />,
          'Help Articles',
          'Browse our help documentation',
          () => {}
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Information</Text>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Version</Text>
          <Text style={styles.infoValue}>1.0.0</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Build</Text>
          <Text style={styles.infoValue}>2024.03.1</Text>
        </View>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  infoLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
});

export default SupportScreen; 