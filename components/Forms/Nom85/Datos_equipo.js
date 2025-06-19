import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Header from "../Header";

export default function Datos_equipo(){
    return(
        <View>
            <Header titulo={"Datos del Equipo"} />
            <View style={styles.rows}>
                <View style={styles.cols}>
                    <View style={styles.mb2}>
                        <Text>Equipo Evaluado</Text>
                        <TextInput style={styles.input} />
                    </View>
                    <View style={styles.mb2}>
                        <Text>Combustible Utilizado</Text>
                        <TextInput style={styles.input} />
                    </View>
                </View>
                <View style={styles.cols}>
                    <View style={styles.mb2}>
                        <Text>Marca y modelo</Text>
                        <TextInput style={styles.input} />
                    </View>
                    <View style={styles.mb2}>
                        <Text>Año</Text>
                        <TextInput style={styles.input} />
                    </View>
                </View>
            </View>
            <View style={styles.rows}> 
                <View style={styles.cols}>
                    <View style={styles.mb2}>
                        <Text>Capacidad Térmica Nominal</Text>
                        <TextInput style={styles.input} />
                    </View>
                </View>

                <View style={styles.cols}>
                    <View style={styles.mb2}>
                        <Text>Altural al nivel del mar</Text>
                        <TextInput style={styles.input} />
                    </View>
                </View>

                <View style={styles.cols}>
                    <View style={styles.mb2}>
                        <Text>presión Estática</Text>
                        <TextInput style={styles.input} />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
    rows:{
        flexDirection: 'row',
        marginBottom: 10,
        gap: 10,
    },
    cols:{
        flex: 1,
    },
    mb2:{
        marginBottom: 10
    }
});