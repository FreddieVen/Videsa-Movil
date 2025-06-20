import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { Table, Row, TableWrapper, Cell } from 'react-native-table-component';

export default function DatosEPA() {
  const tableHeadTop = [
    'Gas',
    'Concentración certificado (Cv)', '',
    'Respuesta de Calibración (Cdir)', '',
    'Error % (ACE)', ''
  ];

  const tableHeadSub = [' ', 'O₂', 'CO₂', 'O₂', 'CO₂', 'O₂', 'CO₂'];

  const [tableData, setTableData] = useState([
    ['Gas bajo', '', '', '', '', '', ''],
    ['Gas medio', '', '', '', '', '', ''],
    ['Gas alto', '', '', '', '', '', '']
  ]);

  const renderCell = (cellData, rowIndex, colIndex) => {
    // Si es la primera columna (nombre del gas), solo mostramos texto
    if (colIndex === 0) {
      return (
        <View style={{ padding: 8 }}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{cellData}</Text>
        </View>
      );
    }

    return (
      <TextInput
        value={cellData}
        onChangeText={(text) => {
          const newData = [...tableData];
          newData[rowIndex][colIndex] = text;
          setTableData(newData);
        }}
        style={{
          textAlign: 'center',
          padding: 4,
          fontSize: 14,
          borderWidth: 0
        }}
        keyboardType="numeric"
      />
    );
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>
        Cálculo del Error (ACE)
      </Text>
      <Table borderStyle={{ borderWidth: 1, borderColor: '#ccc' }}>
        <Row
          data={tableHeadTop}
          textStyle={{ textAlign: 'center', fontWeight: 'bold' }}
        />
        <Row
          data={tableHeadSub}
          textStyle={{ textAlign: 'center', fontWeight: 'bold' }}
        />
        {
          tableData.map((rowData, rowIndex) => (
            <TableWrapper key={rowIndex} style={{ flexDirection: 'row' }}>
              {
                rowData.map((cellData, colIndex) => (
                  <Cell
                    key={colIndex}
                    data={renderCell(cellData, rowIndex, colIndex)}
                  />
                ))
              }
            </TableWrapper>
          ))
        }
      </Table>
    </ScrollView>
  );
}
