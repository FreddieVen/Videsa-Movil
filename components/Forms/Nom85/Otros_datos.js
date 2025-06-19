import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Header from "../Header";
import Rows from "../Elements/Rows";
import RNPickerSelect from 'react-native-picker-select'

export default function Otros_datos(){
    const items = [
        { label: 'Circular', value: 'foCircular' },
        { label: 'Cuadrada', value: 'Cuadrada' },
        { label: 'Rectangular', value: 'Rectangular' },
    ];

    return(
        <View>
            <Header titulo={"Otros datos"}/>
            <Rows>
                <View style={styles.cols}>
                    <View style={styles.mb2}>
                        <Text>Geometría del Conducto</Text>
                        <RNPickerSelect
                            style={styles.select}
                            onValueChange={(value) => console.log(value)}
                            items={items}
                            placeholder={{
                                label: 'Selecciona una opción',
                                value: null,
                                color: '#9CA3AF'
                            }}
                        />
                    </View>
                </View>
                <View style={styles.cols}>
                    <View style={styles.mb2}>
                        <Text> Diametro Interior del Conducto Dch</Text>
                        <TextInput style={styles.input}></TextInput>
                    </View>
                </View>
            </Rows>

            <Rows>
                <View style={styles.cols}>
                    <View style={styles.mb2}>
                        <Text>Largo transversal, L1</Text>
                        <TextInput style={styles.input}></TextInput>
                    </View>
                </View>
                
                <View style={styles.cols}>
                    <View style={styles.mb2}>
                        <Text>Ancho Transversal, L2</Text>
                        <TextInput style={styles.input}></TextInput>
                    </View>
                </View>
                
                <View style={styles.cols}>
                    <View style={styles.mb2}>
                        <Text>Diametro equivalente, Deq.</Text>
                        <TextInput style={styles.input}></TextInput>
                    </View>
                </View>
                
            </Rows>

            <Rows>
                <View style={styles.cols}>
                    <View style={styles.mb2}>
                        <Text>Número de Puertos</Text>
                        <TextInput style={styles.input}></TextInput>
                    </View>
                </View>
                <View style={styles.cols}>
                    <View style={styles.mb2}>
                        <Text>Distancia A</Text>
                        <TextInput style={styles.input}></TextInput>
                    </View>
                </View>
                <View style={styles.cols}>
                    <View style={styles.mb2}>
                        <Text>Distancia B</Text>
                        <TextInput style={styles.input}></TextInput>
                    </View>
                </View>
                <View style={styles.cols}>
                    <View style={styles.mb2}>
                        <Text>Distancia C</Text>
                        <TextInput style={styles.input}></TextInput>
                    </View>
                </View>
            </Rows>

            <Rows>
                <View style={styles.cols}>
                    <View style={styles.mb2}>
                        <Text>N° de diametros en A</Text>
                        <TextInput style={styles.input}></TextInput>
                    </View>
                </View>
                <View style={styles.cols}>
                    <View style={styles.mb2}>
                        <Text>N° de diametros en B</Text>
                        <TextInput style={styles.input}></TextInput>
                    </View>
                </View>
                <View style={styles.cols}>
                    <View style={styles.mb2}>
                        <Text>N° de diametros en C</Text>
                        <TextInput style={styles.input}></TextInput>
                    </View>
                </View>
                <View style={styles.cols}>
                    <View style={styles.mb2}>
                        <Text>Extención del puerto</Text>
                        <TextInput style={styles.input}></TextInput>
                    </View>
                </View>
            </Rows>
        </View>
    );
}

const styles = StyleSheet.create({
    cols:{
        flex: 1,
    },
    mb2:{
        marginBottom: 10
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
    select:{
        height: 46,
        borderWidth:1.5,
        borderColor: '#E5E7EB',
        paddingVertical: 12,
        paddingHorizontal: 10,
        paddingVertical: 12,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        fontSize: 16,
        color: '#1F2937',
    },
    iconContainer: {
        top: 12,
        right: 16,
    },
});