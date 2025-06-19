import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import FormField from "./Formfield";
const FormSection = ({
    section,
    formData,
    onFieldChange,
    isExpanded,
    onToggleExpand
}) => {
    return (
        <View style={styles.sectionContainer}>
            <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => onToggleExpand(section.id)}
            >
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <Text style={styles.expandIcon}>{isExpanded ? '−' : '+'}</Text>
            </TouchableOpacity>

            {isExpanded && (
                <View style={styles.fieldsContainer}>
                    {section.fields.map((field) => (
                        <FormField
                            key={field.key}
                            field={field}
                            value={formData[section.id]?.[field.key] || ''}
                            onValueChange={onFieldChange}
                            sectionId={section.id}
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        backgroundColor: '#fff',
        marginBottom: 16,
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f8f9fa',
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    expandIcon: {
        fontSize: 20,
        color: '#007AFF',
        fontWeight: 'bold',
    },
    fieldsContainer: {
        padding: 16,
    },
});

export default FormSection;