import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';


export default function FormularioTabla() {
    const marcado_sonda16 = (0.20 * (1 / 6) + 0).toFixed(2);
    const marcado_sonda50 = (0.20 * (1 / 2) + 0).toFixed(2);
    const marcado_sonda83 = (0.20 * (5 / 6) + 0).toFixed(2);

    const [concentraciones, setConcentraciones] = useState(["", "", ""]);

    const actualizarConcentracion = (valor, index) => {
    const nuevas = [...concentraciones];
      nuevas[index] = valor;
      setConcentraciones(nuevas);
    };
    const promedio = (array) => {
    const valores = array.map(parseFloat).filter(n => !isNaN(n));
    if (valores.length === 0) return "0.00";
      const suma = valores.reduce((acc, curr) => acc + curr, 0);
      return (suma / valores.length).toFixed(2);
    };

   const promedioValor = parseFloat(promedio(concentraciones));

    const estratificaciones = concentraciones.map((valor, i) => {
    const val = parseFloat(valor);
      return promedioValor > 0 && !isNaN(val)
        ? (((promedioValor - val) / promedioValor) * 100).toFixed(2)
        : "";
    });

    const ppm = concentraciones.map((valor, i) => {
    const val = parseFloat(valor);
      return promedioValor > 0 && !isNaN(val)
        ? ((promedioValor - val) ).toFixed(2)
        : "";
    });
    const maxEstratificacion = Math.max(
      ...estratificaciones.map(v => parseFloat(v)).filter(n => !isNaN(n))
    ).toFixed(2);

    const maxPPM = Math.max(
      ...ppm.map(v => parseFloat(v)).filter(n => !isNaN(n))
    ).toFixed(2);

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* Encabezado */}
      <View style={styles.row}>
        <View style={styles.analitoHeader}>
          <Text style={styles.header}>Analito</Text>
          <TextInput
            style={styles.cellInput}
            placeholder="Ej: NOx"
            placeholderTextColor="#666"
          />
        </View>

        <Text style={styles.header} >Marcado de la sonda (m)</Text>
        <Text style={styles.header}>Concentración (ppm o %vol.)</Text>
        <Text style={styles.header}>% Estratificación</Text>
        <Text style={styles.header}>PPM</Text>
      </View>

      {/* Fila 1 */}
      <View style={styles.row}>
        <Text style={styles.cell}>16.7%</Text>
        <TextInput
          style={styles.cellInput}
          value={marcado_sonda16.toString()}
          editable={false}
        />
        <TextInput
          style={styles.cellInput}
          placeholder="Ingrese valor"
          keyboardType="numeric"
          onChangeText={(text) => actualizarConcentracion(text, 0)}
          value={concentraciones[0]}
        />
        <TextInput
          style={styles.cellInput}
          value={estratificaciones[0]}
          editable={false}
        />
        <TextInput
          style={styles.cellInput}
          value={ppm[0]}
          editable={false}
        />
      </View>

      {/* Fila 2 */}
      <View style={styles.row}>
        <Text style={styles.cell}>50%</Text>
        <TextInput
          style={styles.cellInput}
          value={marcado_sonda50.toString()}
          editable={false}
        />
        <TextInput
          style={styles.cellInput}
          placeholder="Ingrese valor"
          keyboardType="numeric"
          onChangeText={(text) => actualizarConcentracion(text, 1)}
          value={concentraciones[1]}
        />
         <TextInput
          style={styles.cellInput}
          value={estratificaciones[1]}
          editable={false}
        />
        <TextInput
          style={styles.cellInput}
          value={ppm[1]}
          editable={false}
        />
      </View>

      {/* Fila 3 */}
      <View style={styles.row}>
        <Text style={styles.cell}>83.3%</Text>
        <TextInput
          style={styles.cellInput}
          value={marcado_sonda83.toString()}
          editable={false}
        />
        <TextInput
            style={styles.cellInput}
            placeholder="Ingrese valor"
            keyboardType="numeric"
            onChangeText={(text) => actualizarConcentracion(text, 2)}
            value={concentraciones[2]}
          />
         <TextInput
          style={styles.cellInput}
          value={estratificaciones[2]}
          editable={false}
        />
        <TextInput
          style={styles.cellInput}
          value={ppm[2]}
          editable={false}
        />
      </View>
      
      {/* Fila Promedio */}
        <View style={[styles.row]}>
          <Text style={styles.cell}>Promedio</Text>
          <Text style={styles.cell}>—</Text>
          <Text style={styles.cell}>{promedio(concentraciones)}</Text>
           <View style={styles.analitoHeader}>
              <Text style={styles.header}>Máximo</Text>
              <TextInput
                style={styles.cellInput}
                value={maxEstratificacion}
                editable={false}
              />
            </View>

            <View style={styles.analitoHeader}>
              <Text style={styles.header}>Máximo</Text>
              <TextInput
                style={styles.cellInput}
                value={maxPPM}
                editable={false}
              />
            </View>
        </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    alignItems: 'center',
  },
  header: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: '#000',
  },
  cellInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    padding: 6,
    marginHorizontal: 4,
    textAlign: 'center',
  },



   container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    navbar: {
        backgroundColor: '#25a74b',
        paddingTop: 50, // Para el status bar
        paddingBottom: 15,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    navContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
