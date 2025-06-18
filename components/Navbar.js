import React from "react";
import { View, ScrollView, TextInput, TouchableOpacity, StyleSheet, Text } from "react-native";

export default function Nom85(){
    return(
        <View style={styles.container}>
            <View style={styles.navbar}>
                <View style={styles.navContent}>
                    <View style={styles.logoContainer}>
                        <Text style={styles.logo}>Videsa</Text>
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}></Text>
                        <TouchableOpacity style={styles.logoutButton}>
                            <Text style={styles.logoutText}>Cerrar Sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },navbar: {
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
});