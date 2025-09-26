import React, {useEffect, useRef, useState} from 'react';
import {Alert, Platform, StyleSheet, View} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import {getProductByBarcode} from '../../services/products';
import {useCart} from '../../context/CartContext';
import Sound from 'react-native-sound';

export default function ScannerScreen() {
  // Prefer single-device hook for compatibility across VisionCamera versions
  const device = useCameraDevice('back');
  const { add } = useCart();
  const [permission, setPermission] = useState<string>('not-determined');
  const [lastCode, setLastCode] = useState<string | null>(null);
  const beep = useRef<Sound | null>(null);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setPermission(status);
    })();

    Sound.setCategory('Playback');
    if (Platform.OS === 'android') {
      beep.current = new Sound('beep', Sound.MAIN_BUNDLE, (e) => e && console.log('sound error', e));
    } else {
      beep.current = new Sound('beep.mp3', Sound.MAIN_BUNDLE, (e) => e && console.log('sound error', e));
    }
    return () => {
      beep.current?.release();
    };
  }, []);

  const [frameProcessor, barcodes] = useScanBarcodes(
    [BarcodeFormat.EAN_13, BarcodeFormat.EAN_8, BarcodeFormat.UPC_A, BarcodeFormat.UPC_E, BarcodeFormat.QR_CODE],
    { checkInverted: true }
  );

  useEffect(() => {
    const code = barcodes[0]?.displayValue;
    if (!code || code === lastCode) return;
    setLastCode(code);
    (async () => {
      try {
        const p = await getProductByBarcode(code);
        if (p) {
          add(p);
          beep.current?.play();
        } else {
          Alert.alert('Not found', `No product for barcode ${code}`);
        }
      } catch (e: any) {
        Alert.alert('Error', e.message ?? 'Failed to fetch product');
      } finally {
        setTimeout(() => setLastCode(null), 800);
      }
    })();
  }, [barcodes]);

  // Accept both 'granted' (older) and 'authorized' (newer) values
  const hasPermission = permission === 'granted' || permission === 'authorized';
  if (!device || !hasPermission) return <View style={{ flex: 1, backgroundColor: '#000' }} />;

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor as any}
      />
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#000' }});
