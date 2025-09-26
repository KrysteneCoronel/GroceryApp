import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InventoryManagementScreen from '../screens/employee/InventoryManagementScreen';
import ProductDatabaseScreen from '../screens/employee/ProductDatabaseScreen';

const Stack = createNativeStackNavigator();

export default function EmployeeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Inventory" component={InventoryManagementScreen} />
      <Stack.Screen name="ProductDatabase" component={ProductDatabaseScreen} />
    </Stack.Navigator>
  );
}
