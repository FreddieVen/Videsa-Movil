import React from "react";
import { View, StyleSheet } from "react-native";

export default function FormContainer({ children }) {
    return (
        <View style={styles.formContainer}>
            {children}
        </View>
    );
}
const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: 'white',
        margin: 16,
        borderRadius: 8,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    }
});