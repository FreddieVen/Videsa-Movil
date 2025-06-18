import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function Formulario() {
  const [ordenes, setOrdenes] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);
  const [observaciones, setObservaciones] = useState('');

  useEffect(() => {
    fetch('https://videsa.smstudio.biz/api/formulario-datos') // o tu dominio real
      .then(response => response.json())
      .then(data => {
        setOrdenes(data.ordenes);
        setClientes(data.clientes);
      })
      .catch(error => {
        console.error('Error al cargar datos del formulario:', error);
        Alert.alert('Error', 'No se pudieron cargar los datos.');
      });
  }, []);

  const handleEnviar = () => {
    if (!ordenSeleccionada || !observaciones) {
      Alert.alert('Faltan datos', 'Selecciona una orden y escribe observaciones.');
      return;
    }

    // Aquí iría el fetch POST a tu API para guardar los datos
    console.log('Enviando:', { orden: ordenSeleccionada, observaciones });

    Alert.alert('Formulario enviado', `Observaciones guardadas para orden ${ordenSeleccionada.numero_servicio}`);
  };

  const renderOrden = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.ordenItem,
        ordenSeleccionada?.id === item.id && styles.ordenItemSeleccionado
      ]}
      onPress={() => setOrdenSeleccionada(item)}
    >
      <Text style={styles.ordenNombre}>{item.nombre_norma}</Text>
      <Text>{item.cliente}</Text>
      <Text style={{ fontSize: 12 }}>{item.direccion}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Selecciona una Orden</Text>

      <FlatList
        data={ordenes}
        renderItem={renderOrden}
        keyExtractor={item => item.id.toString()}
      />

      <Text style={styles.titulo}>Observaciones</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe tus observaciones..."
        value={observaciones}
        onChangeText={setObservaciones}
        multiline
      />

      <Button title="Enviar Formulario" onPress={handleEnviar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10
  },
  ordenItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10
  },
  ordenItemSeleccionado: {
    backgroundColor: '#cce5ff',
    borderColor: '#007bff'
  },
  ordenNombre: {
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    height: 80,
    textAlignVertical: 'top'
  }
});
