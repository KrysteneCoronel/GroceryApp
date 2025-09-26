import React from 'react';
import { Button, View } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={{ padding: 16 }}>
      <Button title="Open Scanner" onPress={() => navigation?.navigate?.('Scan')} />
      <View style={{ height: 8 }} />
      <Button title="Go to Cart" onPress={() => navigation?.navigate?.('Cart')} />
    </View>
  );
}
