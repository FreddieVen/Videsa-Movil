import React from "react";
import { View, StyleSheet, Text} from "react-native";

export default function Header({titulo}){
    return(
        <View style={styles.header}>
            <Text style={styles.titulo}>{titulo}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    titulo:{
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    }
});