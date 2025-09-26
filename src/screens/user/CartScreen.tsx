import React from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { useCart } from '../../context/CartContext';

export default function CartScreen() {
  const { items, remove, clear, total } = useCart();
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text>{item.name} x{item.qty} @ {item.finalPrice.toFixed(2)}</Text>
            <Button title="Remove" onPress={() => remove(item.id)} />
          </View>
        )}
        ListEmptyComponent={<Text>Your cart is empty</Text>}
      />
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total: ${total.toFixed(2)}</Text>
      <Button title="Checkout" onPress={() => {}} />
      <View style={{ height: 8 }} />
      <Button title="Clear Cart" onPress={clear} />
    </View>
  );
}
