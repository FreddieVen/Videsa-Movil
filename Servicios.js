import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";
import React, { useState, useEffect } from 'react';

export default function Servicios({ navigation }) {
    const [serviciosActivos, setServiciosActivos] = useState([]);
    const usuario = "Juan Pérez"; 

    useEffect(() => {
        fetch('https://videsa.smstudio.biz/api/servicios') 
            .then(response => response.json())
            .then(data => setServiciosActivos(data))
            .catch(error => {
                console.error(error);
                Alert.alert('Error', 'No se pudieron cargar los servicios.');
            });
    }, []);

    const handleIrAFormulario = (servicio) => {
        if (navigation) {
            navigation.navigate('Formulario', { servicio: servicio });
        } else {
            // Si no hay navegación configurada, mostrar un alert de ejemplo
            Alert.alert(
                "Navegar a Formulario",
                `Ir al formulario para el servicio: ${servicio.nombre}`
            );
        }
    };
    const handleCerrarSesion = () => {
        Alert.alert(
            "Cerrar Sesión",
            "¿Estás seguro de que deseas cerrar sesión?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Cerrar Sesión",
                    onPress: () => {
                        // Aquí implementas la lógica para cerrar sesión
                        console.log("Cerrando sesión...");
                    }
                }
            ]
        );
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
            {/* Navbar */}
            <View style={styles.navbar}>
                <View style={styles.navContent}>
                    <View style={styles.logoContainer}>
                        <Text style={styles.logo}>Videsa</Text>
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{usuario}</Text>
                        <TouchableOpacity 
                            style={styles.logoutButton}
                            onPress={handleCerrarSesion}
                        >
                            <Text style={styles.logoutText}>Cerrar Sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Contenido principal */}
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
});