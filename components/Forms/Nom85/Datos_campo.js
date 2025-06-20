import React, { useState, useCallback, memo } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// Configuración
const ROWS_PER_PAGE = 10;
const COLUMNS_CONFIG = [
  { id: 'number', label: 'N°', width: 60, editable: false },
  { id: 'nox', label: 'Nox (ppmv)', width: 120, keyboardType: 'numeric' },
  { id: 'co', label: 'Co (ppvm)', width: 120, keyboardType: 'numeric' },
  { id: 'o2', label: 'O2(%)', width: 90, keyboardType: 'numeric' },
  { id: 'co2', label: 'CO(%)', width: 90, keyboardType: 'numeric' },
  { id: 'temp', label: 'Temp (°C)', width: 120, keyboardType: 'numeric' }
];

// Componente memoizado para celdas
const InputCell = memo(({ value, onChange, config, isNumberCell, rowNumber }) => {
  if (isNumberCell) {
    return <Text style={styles.rowNumber}>{rowNumber}</Text>;
  }
  
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChange}
      keyboardType={config.keyboardType}
      placeholder="-"
      editable={!config.editable}
      selectTextOnFocus
    />
  );
});

// Componente memoizado para filas
const DataRow = memo(({ rowData, onUpdate, absoluteRowNumber }) => (
  <View style={styles.row}>
    {COLUMNS_CONFIG.map((column) => (
      <View key={`${rowData.id}-${column.id}`} style={[styles.cell, { width: column.width }]}>
        <InputCell
          value={rowData[column.id] || ''}
          onChange={(text) => onUpdate(rowData.id, column.id, text)}
          config={column}
          isNumberCell={column.id === 'number'}
          rowNumber={absoluteRowNumber}
        />
      </View>
    ))}
  </View>
));

const DatosCampo = () => {
  const [data, setData] = useState(() => 
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      nox: '',
      co: '',
      o2: '',
      co2: '',
      temp: ''
    }))
  );
  const [currentPage, setCurrentPage] = useState(0);

  const handleUpdate = useCallback((rowId, field, value) => {
    setData(prev => prev.map(row => 
      row.id === rowId ? { ...row, [field]: value } : row
    ));
  }, []);

  const renderHeader = () => (
    <View style={styles.headerRow}>
      {COLUMNS_CONFIG.map(column => (
        <View key={`header-${column.id}`} style={[styles.headerCell, { width: column.width }]}>
          <Text style={styles.headerText}>{column.label}</Text>
        </View>
      ))}
    </View>
  );

  // Calcular datos para la página actual
  const startIdx = currentPage * ROWS_PER_PAGE;
  const endIdx = startIdx + ROWS_PER_PAGE;
  const currentData = data.slice(startIdx, endIdx);

  // Generar botones de paginación
  const totalPages = Math.ceil(data.length / ROWS_PER_PAGE);
  const pageButtons = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <View style={styles.container}>
      {renderHeader()}
      
      <ScrollView 
        style={styles.scrollView}
        removeClippedSubviews={true}
        keyboardShouldPersistTaps="handled"
      >
        {currentData.map((row, index) => {
          const absoluteRowNumber = startIdx + index + 1; // +1 para comenzar desde 1
          return (
            <DataRow 
              key={`row-${row.id}`}
              rowData={row}
              onUpdate={handleUpdate}
              absoluteRowNumber={absoluteRowNumber}
            />
          );
        })}
      </ScrollView>

      <View style={styles.pagination}>
        {currentPage > 0 && (
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setCurrentPage(prev => Math.max(0, prev - 1))}
          >
            <Text style={styles.navButtonText}>{"<"}</Text>
          </TouchableOpacity>
        )}

        {pageButtons.map(page => {
          // Mostrar solo algunos botones alrededor de la página actual
          if (Math.abs(page - currentPage) <= 2 || 
              page === 0 || 
              page === totalPages - 1) {
            return (
              <TouchableOpacity
                key={`page-${page}`}
                style={[
                  styles.pageButton,
                  currentPage === page && styles.activePageButton
                ]}
                onPress={() => setCurrentPage(page)}
              >
                <Text style={styles.pageButtonText}>{page + 1}</Text>
              </TouchableOpacity>
            );
          }
          
          // Mostrar puntos suspensivos para botones ocultos
          if (Math.abs(page - currentPage) === 3) {
            return (
              <Text key={`ellipsis-${page}`} style={styles.ellipsis}>
                ...
              </Text>
            );
          }
          
          return null;
        })}

        {currentPage < totalPages - 1 && (
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
          >
            <Text style={styles.navButtonText}>{">"}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// Estilos optimizados
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerCell: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  cell: {
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  rowNumber: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
  },
  input: {
    width: '90%',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    fontSize: 16,
    color: '#1F2937',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#f9f9f9',
    flexWrap: 'wrap',
  },
  pageButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
    backgroundColor: '#e0e0e0',
  },
  activePageButton: {
    backgroundColor: '#007AFF',
  },
  pageButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  activePageButtonText: {
    color: '#fff',
  },
  navButton: {
    paddingHorizontal: 12,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    backgroundColor: '#e0e0e0',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  ellipsis: {
    marginHorizontal: 4,
    fontSize: 16,
    color: '#666',
  },
});

export default DatosCampo;