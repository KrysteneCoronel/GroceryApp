import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/user/HomeScreen';
import ScannerScreen from '../screens/user/ScannerScreen';
import CartScreen from '../screens/user/CartScreen';
import ComparisonScreen from '../screens/user/ComparisonScreen';
import FavoritesChecklistScreen from '../screens/user/FavoritesChecklistScreen';

const Tab = createBottomTabNavigator();

export default function UserTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Scan" options={{ title: 'Scanner' }} component={ScannerScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Compare" component={ComparisonScreen} />
      <Tab.Screen name="Favorites" component={FavoritesChecklistScreen} />
    </Tab.Navigator>
  );
}
