import React, { useState } from 'react';
import { Alert, Button, TextInput, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function SignupScreen() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const onSignup = async () => {
    try {
      await signUp(email.trim(), pw);
      Alert.alert('Check your email to confirm.');
    } catch (e: any) {
      Alert.alert('Signup failed', e?.message ?? 'Unable to sign up');
    }
  };
  return (
    <View style={{ padding: 16 }}>
      <TextInput placeholder="Email" autoCapitalize="none" keyboardType="email-address" onChangeText={setEmail} value={email} style={{borderWidth:1,padding:8,marginBottom:8}} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPw} value={pw} style={{borderWidth:1,padding:8,marginBottom:8}} />
      <Button title="Create account" onPress={onSignup} />
    </View>
  );
}
