import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigation/types';
import TabNavigator from './navigation/TabNavigator';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import OTPVerificationScreen from './screens/OTPVerificationScreen';
import DeliveryDetailsScreen from './screens/DeliveryDetails';
import EditProfileScreen from './screens/EditProfileScreen';
import PrivacyScreen from './screens/PrivacyScreen';
import SupportScreen from './screens/SupportScreen';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2196F3',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {!isAuthenticated ? (
        // Auth Stack
        <>
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Registration" 
            component={RegistrationScreen} 
            options={{ title: 'Register' }}
          />
          <Stack.Screen 
            name="OTPVerification" 
            component={OTPVerificationScreen} 
            options={{ title: 'Verify OTP' }}
          />
        </>
      ) : (
        // App Stack
        <>
          <Stack.Screen 
            name="HomeTab" 
            component={TabNavigator} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="DeliveryDetails" 
            component={DeliveryDetailsScreen} 
            options={{ title: 'Delivery Details' }}
          />
          <Stack.Screen 
            name="EditProfile" 
            component={EditProfileScreen} 
            options={{ title: 'Edit Profile' }}
          />
          <Stack.Screen 
            name="Privacy" 
            component={PrivacyScreen} 
            options={{ title: 'Privacy & Security' }}
          />
          <Stack.Screen 
            name="Support" 
            component={SupportScreen} 
            options={{ title: 'Help & Support' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
} 