import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DatosHumedad from './Datos_Humedad'; 

import Navbar from '../../Nav';

export default function FotosCaldera() {
  const [fotoDistribucion, setFotoDistribucion] = useState(null);
  const [fotoConducto, setFotoConducto] = useState(null);

  const tomarFoto = async () => {
    const permiso = await ImagePicker.requestCameraPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert('Permiso requerido', 'Se necesita permiso para acceder a la cámara');
      return;
    }
    const resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });
    if (!resultado.canceled) {
      setFotoDistribucion(resultado.assets[0].uri);
    }
  };

  const TomarCaldera = async () => {
    const permiso = await ImagePicker.requestCameraPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert('Permiso requerido', 'Se necesita permiso para acceder a la cámara');
      return;
    }
    const resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });
    if (!resultado.canceled) {
      setFotoConducto(resultado.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Navbar />

      <View style={styles.row}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle} numberOfLines={2}>
            Distribución de puntos para presion dinamica
          </Text>
          <Button title="Tomar foto" onPress={tomarFoto} />
          {fotoDistribucion && (
            <Image source={{ uri: fotoDistribucion }} style={styles.image} />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle} numberOfLines={2}>
            Forma del conducto
          </Text>
          <Button title="Tomar foto" onPress={TomarCaldera} />
          {fotoConducto && (
            <Image source={{ uri: fotoConducto }} style={styles.image} />
          )}
        </View>
      </View>

      <View style={[styles.section, { width: '100%' }]}>
        <Text style={styles.sectionTitle}>Comentarios</Text>
        <TextInput
          style={[styles.input, { height: 50 }]}
          placeholder="Escribe tus observaciones aquí..."
          multiline
        />
      </View>

      {/* Aquí agregamos el componente importado */}
      <DatosHumedad />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  navbar: {
    backgroundColor: '#25a74b',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  navContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
  },
  section: {
    width: '48%',
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#1f2937',
  },
  input: {
    height: 46,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    fontSize: 16,
    color: '#1F2937',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 8,
  },
});