import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function DatosHumedad() {


  return (
    <View contentContainerStyle={styles.container}>
      
      {/* Sección de Flujo de la bomba */}
      <View style={[styles.section, { width: '100%' }]}>
        <Text style={styles.sectionTitle}>Flujo de la bomba</Text>
        <TextInput
          style={[styles.input, { height: 50}]}
          placeholder="Escribe aquí..."
          multiline
        />
      </View>

      {/* Sección de Tiempo Medido */}
      <View style={[styles.section, { width: '100%' }]}>
        <Text style={styles.sectionTitle}>Tiempo Medido, Tm</Text>
        <TextInput
          style={[styles.input, { height: 50}]}
          placeholder="Escribe aquí..."
          multiline
        />
      </View>

      {/* Encabezado */}
        <View style={styles.row}>
          
          <Text style={styles.header}>No. De impactador</Text>
          <Text style={styles.header}>1</Text>
          <Text style={styles.header}>2</Text>
          <Text style={styles.header}>3</Text>
          <Text style={styles.header}>4</Text>
          <Text style={styles.header}>PTAC (g)</Text>
        </View>

      {/* Fila 1 */}
      <View style={styles.row}>
        <Text style={styles.cell}>Peso Inicial (g)</Text>
        <TextInput style={styles.cellInput} placeholder="Ingrese valor" />
        <TextInput style={styles.cellInput} placeholder="Ingrese valor" />
        <TextInput style={styles.cellInput} placeholder="Ingrese valor" />
        <TextInput style={styles.cellInput} placeholder="Ingrese valor" />
        <TextInput style={styles.cellInput} readOnly/>
      </View>

      {/* Fila 2 */}
      <View style={styles.row}>
        <Text style={styles.cell}>Peso Final (g)</Text>
        <TextInput style={styles.cellInput} placeholder="Ingrese valor" />
        <TextInput style={styles.cellInput} placeholder="Ingrese valor" />
        <TextInput style={styles.cellInput} placeholder="Ingrese valor" />
        <TextInput style={styles.cellInput} placeholder="Ingrese valor" />
        <TextInput style={styles.cellInput} readOnly/>
      </View>

      {/* Fila 3 */}
      <View style={styles.row}>
        <Text style={styles.cell}>Ganancia</Text>
        <TextInput style={styles.cellInput} readOnly/>
        <TextInput style={styles.cellInput} readOnly/>
        <TextInput style={styles.cellInput} readOnly/>
        <TextInput style={styles.cellInput} readOnly/>
        <TextInput style={styles.cellInput} readOnly/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
navbar: {
        backgroundColor: '#25a74b',
        paddingTop: 50, // Para el status bar
        paddingBottom: 15,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
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
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    alignItems: 'center',
  },
   header: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: '#000',
  },
  cellInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    padding: 6,
    marginHorizontal: 4,
    textAlign: 'center',
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
 input:{
        height: 46,
        borderWidth: 1.5,
        borderColor: '#E5E7EB',
        borderRadius: 16,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        fontSize: 16,
        color: '#1F2937',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        }
    },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 8,
  },
});