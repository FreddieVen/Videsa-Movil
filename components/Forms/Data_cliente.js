import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function DataCliente({ fechaEvaluacion, razon_social }) {
    return(
        <View>
            <View style={styles.section}>
                <View style={styles.rows}>
                    <Text style={styles.label}>Razón Social: {razon_social}</Text>
                    <Text style={styles.label}>Fecha de Evaluación: {fechaEvaluacion}</Text>
                </View>
            </View>
        </View>
        
    );
}

const styles = StyleSheet.create({
    section:{
        paddingBottom: 10,
        marginBottom:20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    rows:{
        flexDirection: 'row',
        marginBottom: 10,
        gap: 10,
    },
    label: {
        fontSize: 14,
        color: '#333',
        flex: 1,
    },
});