// src/screens/ExpoFeaturesScreen.js - Funcionalidades específicas de Expo
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import * as Linking from 'expo-linking';

const ExpoFeaturesScreen = () => {
  const [location, setLocation] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Obtener ubicación actual
  const getCurrentLocation = async () => {
    try {
      setLoading(true);
      
      // Pedir permisos
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Error', 'Permisos de ubicación denegados');
        return;
      }

      // Obtener ubicación
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      
      // Haptic feedback
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      Alert.alert(
        'Ubicación obtenida',
        `Lat: ${location.coords.latitude.toFixed(4)}\nLon: ${location.coords.longitude.toFixed(4)}`
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener la ubicación');
    } finally {
      setLoading(false);
    }
  };

  // Seleccionar imagen de la galería
  const pickImage = async () => {
    try {
      // Pedir permisos
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Error', 'Permisos de galería denegados');
        return;
      }

      // Abrir selector de imagen
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo seleccionar la imagen');
    }
  };

  // Tomar foto con la cámara
  const takePhoto = async () => {
    try {
      // Pedir permisos
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Error', 'Permisos de cámara denegados');
        return;
      }

      // Abrir cámara
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo tomar la foto');
    }
  };

  // Copiar al portapapeles
  const copyToClipboard = async () => {
    const textToCopy = 'Este texto fue copiado desde mi app React Native con Expo!';
    await Clipboard.setStringAsync(textToCopy);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('¡Copiado!', 'Texto copiado al portapapeles');
  };

  // Abrir enlace externo
  const openWebsite = async () => {
    const url = 'https://expo.dev';
    const supported = await Linking.canOpenURL(url);
    
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', 'No se puede abrir el enlace');
    }
  };

  // Enviar email
  const sendEmail = async () => {
    const email = 'mailto:soporte@miapp.com?subject=Hola desde mi app&body=Este email fue enviado desde mi app React Native';
    const supported = await Linking.canOpenURL(email);
    
    if (supported) {
      await Linking.openURL(email);
    } else {
      Alert.alert('Error', 'No se puede enviar el email');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Funcionalidades Expo</Text>
        <Text style={styles.subtitle}>APIs nativas incluidas</Text>
      </View>

      {/* Ubicación */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="location" size={24} color="#3b82f6" />
          <Text style={styles.sectionTitle}>Ubicación</Text>
        </View>
        <TouchableOpacity 
          style={styles.button}
          onPress={getCurrentLocation}
          disabled={loading}>
          <Text style={styles.buttonText}>
            {loading ? 'Obteniendo...' : 'Obtener Ubicación'}
          </Text>
        </TouchableOpacity>
        {location && (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              📍 Lat: {location.coords.latitude.toFixed(4)}
            </Text>
            <Text style={styles.infoText}>
              📍 Lon: {location.coords.longitude.toFixed(4)}
            </Text>
          </View>
        )}
      </View>

      {/* Cámara e Imágenes */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="camera" size={24} color="#10b981" />
          <Text style={styles.sectionTitle}>Cámara e Imágenes</Text>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.buttonHalf]} onPress={takePhoto}>
            <Text style={styles.buttonText}>Tomar Foto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonHalf]} onPress={pickImage}>
            <Text style={styles.buttonText}>Galería</Text>
          </TouchableOpacity>
        </View>
        {image && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.selectedImage} />
          </View>
        )}
      </View>

      {/* Utilidades */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="build" size={24} color="#f59e0b" />
          <Text style={styles.sectionTitle}>Utilidades</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={copyToClipboard}>
          <Text style={styles.buttonText}>Copiar al Portapapeles</Text>
        </TouchableOpacity>
      </View>

      {/* Enlaces */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="link" size={24} color="#ef4444" />
          <Text style={styles.sectionTitle}>Enlaces</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={openWebsite}>
          <Text style={styles.buttonText}>Abrir Expo.dev</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={sendEmail}>
          <Text style={styles.buttonText}>Enviar Email</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  section: {
    backgroundColor: '#ffffff',
    margin: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#3b82f6',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonHalf: {
    flex: 0.48,
  },
  infoBox: {
    backgroundColor: '#f3f4f6',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 5,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  selectedImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
  },
});

export default ExpoFeaturesScreen;