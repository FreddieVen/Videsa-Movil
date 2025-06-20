import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';

export default function FormularioTabla() {


    const marcado_sonda16 = 0.03; 
  return (
    <ScrollView contentContainerStyle={styles.container}>

                {/* Navbar */}
                <View style={styles.navbar}>
                    <View style={styles.navContent}>
                      
                    </View>
                </View>


      {/* Encabezado */}
      <View style={styles.row}>
        <View style={styles.analitoHeader}>
          <Text style={styles.analitoLabel}>Analito</Text>
          <TextInput
            style={styles.cellInput}
            placeholder="Ej: NOx"
            placeholderTextColor="#666"
          />
        </View>

        <Text style={styles.header}>Marcado de la sonda (m)</Text>
        <Text style={styles.header}>Concentración (ppm o %vol.)</Text>
        <Text style={styles.header}>% Estratificación / ppm</Text>
      </View>

      {/* Fila 1 */}
      <View style={styles.row}>
        <Text style={styles.cell}>16.7%</Text>
        <TextInput style={styles.cellInput} readOnly/>
        <TextInput style={styles.cellInput} placeholder="Ingrese valor" />
        <TextInput style={styles.cellInput} readOnly/>
      </View>

      {/* Fila 2 */}
      <View style={styles.row}>
        <Text style={styles.cell}>50%</Text>
        <TextInput style={styles.cellInput} readOnly/>
        <TextInput style={styles.cellInput} placeholder="Ingrese valor" />
        <TextInput style={styles.cellInput} readOnly/>
      </View>

      {/* Fila 3 */}
      <View style={styles.row}>
        <Text style={styles.cell}>83.3%</Text>
        <TextInput style={styles.cellInput} readOnly/>
        <TextInput style={styles.cellInput} placeholder="Ingrese valor" />
        <TextInput style={styles.cellInput} readOnly/>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
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



   container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
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
});
