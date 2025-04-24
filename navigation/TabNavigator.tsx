import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeIcon, TruckIcon, CurrencyDollarIcon, UserIcon } from 'react-native-heroicons/outline';
import HomeScreen from '../screens/HomeScreen';
import DeliveriesScreen from '../screens/DeliveriesScreen.tsx';
import CashCollectionScreen from '../screens/CashCollectionScreen.tsx'; 
import ProfileScreen from '../screens/ProfileScreen.tsx';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: '#9E9E9E',
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
        },
        headerStyle: {
          backgroundColor: '#2196F3',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <HomeIcon size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="DeliveriesTab"
        component={DeliveriesScreen}
        options={{
          title: 'Deliveries',
          tabBarIcon: ({ color, size }) => <TruckIcon size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="CashCollectionTab"
        component={CashCollectionScreen}
        options={{
          title: 'Cash',
          tabBarIcon: ({ color, size }) => <CurrencyDollarIcon size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <UserIcon size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator; 