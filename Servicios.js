import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Servicios({ navigation }) {
  const [serviciosActivos, setServiciosActivos] = useState([]);
  const [usuarioNombre, setUsuarioNombre] = useState('');

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        const userInfo = await AsyncStorage.getItem('user_info');

        if (!token) {
          Alert.alert('Sesión caducada', 'Inicia sesión nuevamente.');
          navigation.replace('Login');
          return;
        }

        console.log('🔐 Token que se envía al backend:', token);

        if (userInfo) {
          const user = JSON.parse(userInfo);
          setUsuarioNombre(user.nombre || 'Usuario');
        }

        const response = await fetch('https://videsa.smstudio.biz/api/servicios', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          }
        });

        if (!response.ok) {
          let errorDetails = {};
          try {
            errorDetails = await response.json();
            console.log('❌ Respuesta del backend:', errorDetails);
          } catch (e) {
            console.log('⚠️ La respuesta no fue JSON');
          }
          throw new Error(errorDetails.message || 'Error al obtener los servicios');
        }

        const data = await response.json();
        setServiciosActivos(data);
      } catch (error) {
        console.error('🧨 Error en cargarDatos:', error.message);
        Alert.alert('Error', error.message || 'No se pudieron cargar los servicios.');
      }
    };

    cargarDatos();
  }, []);

  const handleCerrarSesion = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de que deseas cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Cerrar Sesión",
          onPress: async () => {
            await AsyncStorage.removeItem('auth_token');
            await AsyncStorage.removeItem('user_info');
            navigation.replace('Login');
          }
        }
      ]
    );
  };

  const handleIrAFormulario = (servicio) => {
    navigation.navigate('Formulario', { servicio });
  };

  const renderServicio = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.servicioNombre}>{item.nombre}</Text>
        <Text style={styles.clienteNombre}>{item.cliente}</Text>
        <Text style={styles.servicioDescripcion}>{item.descripcion}</Text>
        <Text style={styles.servicioDireccion}>{item.direccion}</Text>
      </View>
      <TouchableOpacity
        style={styles.formularioButton}
        onPress={() => handleIrAFormulario(item)}
      >
        <Text style={styles.formularioButtonText}>Gestionar Servicio</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <View style={styles.navContent}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>Videsa</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{usuarioNombre}</Text>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleCerrarSesion}
            >
              <Text style={styles.logoutText}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Servicios Activos</Text>
        <FlatList
          data={serviciosActivos}
          renderItem={renderServicio}
          keyExtractor={(item) => item.id.toString()}
          style={styles.servicesList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
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
    logoContainer: {
        flex: 1,
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    userInfo: {
        alignItems: 'flex-end',
    },
    userName: {
        fontSize: 16,
        color: '#FFFFFF',
        marginBottom: 5,
        fontWeight: '500',
    },
    logoutButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    logoutText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '500',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 24,
        color: '#1F2937',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    servicesList: {
        flex: 1,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 3,
        borderLeftWidth: 4,
        borderLeftColor: '#25a74b',
    },
    cardContent: {
        marginBottom: 15,
    },
    servicioNombre: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 8,
    },
    clienteNombre: {
        fontSize: 16,
        fontWeight: '600',
        color: '#25a74b',
        marginBottom: 6,
    },
    servicioDescripcion: {
        fontSize: 14,
        color: '#4B5563',
        lineHeight: 20,
        marginBottom: 8,
        fontStyle: 'italic',
    },
    servicioDireccion: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 20,
        marginBottom:7
    },
    formularioButton: {
        backgroundColor: '#25a74b',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 5,
    },
    formularioButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
    rows:{
        flexDirection: 'row',
        marginBottom: 10,
        gap: 10,
    }
});