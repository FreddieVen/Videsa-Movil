// App.js - Ejemplo funcional de navegación
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ============ PANTALLAS ============

// Pantalla de Home con lista de productos
function HomeScreen({ navigation }) {
  const productos = [
    { id: 1, nombre: 'iPhone 15', precio: 999, categoria: 'Tecnología' },
    { id: 2, nombre: 'MacBook Pro', precio: 2499, categoria: 'Tecnología' },
    { id: 3, nombre: 'AirPods Pro', precio: 249, categoria: 'Audio' },
  ];

  const verDetalle = (producto) => {
    navigation.navigate('Detalles', {
      producto: producto,
      mensaje: `Detalles de ${producto.nombre}`
    });
  };

  const renderProducto = ({ item }) => (
    <TouchableOpacity 
      style={styles.productoItem}
      onPress={() => verDetalle(item)}>
      <View>
        <Text style={styles.productoNombre}>{item.nombre}</Text>
        <Text style={styles.productoCategoria}>{item.categoria}</Text>
        <Text style={styles.productoPrecio}>${item.precio}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#666" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Productos</Text>
      <FlatList
        data={productos}
        renderItem={renderProducto}
        keyExtractor={item => item.id.toString()}
        style={styles.lista}
      />
    </View>
  );
}

// Pantalla de detalles del producto
function DetallesScreen({ route, navigation }) {
  const { producto, mensaje } = route.params;

  const agregarAlCarrito = () => {
    Alert.alert(
      'Agregado',
      `${producto.nombre} agregado al carrito`,
      [
        { text: 'OK' },
        {
          text: 'Ver Carrito',
          onPress: () => navigation.navigate('CarritoTab')
        }
      ]
    );
  };

  const irAOtraPage = () => {
    navigation.navigate('OtraPagina', {
      desde: 'Detalles',
      productoId: producto.id
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.detalleCard}>
        <Text style={styles.detalleNombre}>{producto.nombre}</Text>
        <Text style={styles.detalleCategoria}>{producto.categoria}</Text>
        <Text style={styles.detallePrecio}>${producto.precio}</Text>
        <Text style={styles.detalleMensaje}>{mensaje}</Text>
      </View>

      <View style={styles.botones}>
        <TouchableOpacity 
          style={styles.botonPrimario}
          onPress={agregarAlCarrito}>
          <Text style={styles.textoBoton}>Agregar al Carrito</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.botonSecundario}
          onPress={irAOtraPage}>
          <Text style={styles.textoBotonSecundario}>Ir a Otra Página</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.botonSecundario}
          onPress={() => navigation.goBack()}>
          <Text style={styles.textoBotonSecundario}>Volver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}



// Pantalla de perfil
function PerfilScreen({ navigation }) {
  const usuario = {
    nombre: 'Juan Developer',
    email: 'juan@example.com',
    pedidos: 5
  };

  const irAConfiguracion = () => {
    navigation.navigate('Configuracion', {
      usuario: usuario
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.perfilContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
        <Text style={styles.perfilNombre}>{usuario.nombre}</Text>
        <Text style={styles.perfilEmail}>{usuario.email}</Text>
        <Text style={styles.perfilPedidos}>Pedidos realizados: {usuario.pedidos}</Text>
      </View>

      <TouchableOpacity 
        style={styles.botonPrimario}
        onPress={irAConfiguracion}>
        <Text style={styles.textoBoton}>Configuración</Text>
      </TouchableOpacity>
    </View>
  );
}

// Otra página de ejemplo
function OtraPaginaScreen({ route, navigation }) {
  const { desde, productoId } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Otra Página</Text>
      <Text style={styles.textoInfo}>Llegaste desde: {desde}</Text>
      <Text style={styles.textoInfo}>Producto ID: {productoId}</Text>
      
      <TouchableOpacity 
        style={styles.botonSecundario}
        onPress={() => navigation.goBack()}>
        <Text style={styles.textoBotonSecundario}>Volver</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.botonSecundario}
        onPress={() => navigation.popToTop()}>
        <Text style={styles.textoBotonSecundario}>Ir al Inicio</Text>
      </TouchableOpacity>
    </View>
  );
}

// Pantalla de configuración
function ConfiguracionScreen({ route, navigation }) {
  const { usuario } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Configuración</Text>
      <Text style={styles.textoInfo}>Usuario: {usuario.nombre}</Text>
      <Text style={styles.textoInfo}>Email: {usuario.email}</Text>
      
      <TouchableOpacity 
        style={styles.botonSecundario}
        onPress={() => navigation.goBack()}>
        <Text style={styles.textoBotonSecundario}>Volver al Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}


// ============ NAVEGADORES ============

// Navegador de pestañas
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'CarritoTab') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'PerfilTab') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}>
      
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Inicio',
          headerTitle: 'Tienda',
        }}
      />
      
      <Tab.Screen 
        name="CarritoTab" 
        component={CarritoScreen}
        options={{
          tabBarLabel: 'Carrito',
          headerTitle: 'Mi Carrito',
        }}
      />
      
      <Tab.Screen 
        name="PerfilTab" 
        component={PerfilScreen}
        options={{
          tabBarLabel: 'Perfil',
          headerTitle: 'Mi Perfil',
        }}
      />
    </Tab.Navigator>
  );
}

// Navegador principal (Stack)
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        
        <Stack.Screen 
          name="Main" 
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen 
          name="Detalles" 
          component={DetallesScreen}
          options={{ title: 'Detalles del Producto' }}
        />
        
        <Stack.Screen 
          name="OtraPagina" 
          component={OtraPaginaScreen}
          options={{ title: 'Otra Página' }}
        />
        
        <Stack.Screen 
          name="Configuracion" 
          component={ConfiguracionScreen}
          options={{ title: 'Configuración' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ============ ESTILOS ============
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  lista: {
    flex: 1,
  },
  productoItem: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productoNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productoCategoria: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  productoPrecio: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 5,
  },
  detalleCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detalleNombre: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  detalleCategoria: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  detallePrecio: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
  },
  detalleMensaje: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
  },
  botones: {
    gap: 10,
  },
  botonPrimario: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonSecundario: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  textoBoton: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textoBotonSecundario: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  carritoItem: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  carritoInfo: {
    flex: 1,
  },
  carritoNombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  carritoCantidad: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  carritoPrecio: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  totalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  perfilContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  avatarText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  perfilNombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  perfilEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  perfilPedidos: {
    fontSize: 14,
    color: '#888',
  },
  textoInfo: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default App;