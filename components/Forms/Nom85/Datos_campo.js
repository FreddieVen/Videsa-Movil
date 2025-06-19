import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native-web";
import Rows from "../Elements/Rows";

export default function Datos_campo(){
    return(
        <View>
            <Rows>
                <View style={styles.cols}>
                    <View style={styles.mb2}>
                        <Text>N°</Text>
                    </View>
                </View>

                <View style={styles.cols}>
                    <View style={styles.mb2}>
                        <Text>Nox (ppmv)</Text>
                    </View>
                </View>

                <View style={styles.cols}>
                    <View style={styles.mb2}>
                        <Text>Co (ppvm)</Text>
                    </View>
                </View>

                <View style={styles.cols}>
                    <View style={styles.mb2}>
                        <Text>O2(%)</Text>
                    </View>
                </View>

                <View style={styles.cols}>
                    <View style={styles.mb2}>
                        <Text>CO(%)</Text>
                    </View>
                </View>

                <View style={styles.cols}>
                    <View style={styles.mb2}>
                        <Text>Temp (°C)</Text>
                    </View>
                </View>

            </Rows>
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
    cols:{
        flex: 1,
    },
    mb2:{
        marginBottom: 10
    },
});