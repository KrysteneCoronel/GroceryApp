import React, { useState } from 'react';
import { Alert, Button, TextInput, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function EmployeeLoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const go = async () => {
    try { await signIn(email.trim(), pw); }
    catch (e: any) { Alert.alert('Login failed', e?.message ?? 'Unable to sign in'); }
  };
  return (
    <View style={{ padding: 16 }}>
      <TextInput placeholder="Employee Email" autoCapitalize="none" keyboardType="email-address" onChangeText={setEmail} value={email} style={{borderWidth:1,padding:8,marginBottom:8}} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPw} value={pw} style={{borderWidth:1,padding:8,marginBottom:8}} />
      <Button title="Login as Employee" onPress={go} />
    </View>
  );
}
