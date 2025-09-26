import React, { useState } from 'react';
import { Button, FlatList, Text, TextInput, View } from 'react-native';

type Item = { id: string; name: string; };

export default function FavoritesChecklistScreen() {
  const [items, setItems] = useState<Item[]>([]);
  const [text, setText] = useState('');
  const add = () => { if (!text.trim()) return; setItems((p) => [...p, { id: Date.now().toString(), name: text.trim() }]); setText(''); };
  const remove = (id: string) => setItems((p) => p.filter((i) => i.id !== id));
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput placeholder="Add planned item" value={text} onChangeText={setText} style={{borderWidth:1,padding:8,marginBottom:8}} />
      <Button title="Add" onPress={add} />
      <FlatList
        style={{ marginTop: 12 }}
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text>{item.name}</Text>
            <Button title="Remove" onPress={() => remove(item.id)} />
          </View>
        )}
      />
    </View>
  );
}
