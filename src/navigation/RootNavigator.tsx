import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import UserTabs from './UserTabs';
import EmployeeStack from './EmployeeStack';
import { useAuth } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user, role, loading } = useAuth();

  if (loading) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="Auth" component={AuthStack} />
      ) : role === 'employee' ? (
        <Stack.Screen name="Employee" component={EmployeeStack} />
      ) : (
        <Stack.Screen name="User" component={UserTabs} />
      )}
    </Stack.Navigator>
  );
}
