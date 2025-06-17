import React  from "react";
import { View, Text, StyleSheet } from "react-native";


export default function Servicios(){
    
    return (
        <View style={styles.container}>
            <View style={styles.nav}>
                <Text>Videsa</Text>
            </View>
            <View style={styles.serv_activos}>
                <Text style={styles.text}>Servicios Activos</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
    },
    text: {
        fontSize: 24,
        color: '#1F2937',
    },
    nav:{
        margin: 20,
        backgroundColor: '#25a74b',
    },
    serv_activos:{

    }
});