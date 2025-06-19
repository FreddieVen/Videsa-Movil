import React from "react";
import { View, StyleSheet } from "react-native";

export default function Rows({children}){
    return (
        <View style={styles.rows}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    rows:{
        flexDirection: 'row',
        marginBottom: 10,
        gap: 10,
    }
});