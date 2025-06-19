// App.js - Sin barra de título y con stepper form
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './Login'; 
import Servicios from './Servicios';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Pantalla de Home
function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Servicios />
    </SafeAreaView>
  );
}

// Componente del Stepper
function StepIndicator({ currentStep, totalSteps }) {
  return (
    <View style={styles.stepperContainer}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <View key={index} style={styles.stepWrapper}>
          <View style={[
            styles.stepCircle,
            index < currentStep ? styles.stepCompleted :
            index === currentStep ? styles.stepActive : styles.stepInactive
          ]}>
            {index < currentStep ? (
              <Ionicons name="checkmark" size={16} color="#fff" />
            ) : (
              <Text style={[
                styles.stepText,
                index === currentStep ? styles.stepTextActive : styles.stepTextInactive
              ]}>
                {index + 1}
              </Text>
            )}
          </View>
          {index < totalSteps - 1 && (
            <View style={[
              styles.stepLine,
              index < currentStep ? styles.stepLineCompleted : styles.stepLineInactive
            ]} />
          )}
        </View>
      ))}
    </View>
  );
}

// Paso 1: Revisar Carrito
function CartReviewStep({ carritoItems, updateQuantity, removeItem, onNext }) {
  const total = carritoItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

  const renderCarritoItem = ({ item }) => (
    <View style={styles.cartItemCard}>
      <View style={styles.cartItemInfo}>
        <Text style={styles.cartItemName}>{item.nombre}</Text>
        <Text style={styles.cartItemPrice}>${item.precio}</Text>
      </View>
      
      <View style={styles.quantityControls}>
        <TouchableOpacity 
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, item.cantidad - 1)}>
          <Ionicons name="remove" size={20} color="#007AFF" />
        </TouchableOpacity>
        
        <Text style={styles.quantityText}>{item.cantidad}</Text>
        
        <TouchableOpacity 
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, item.cantidad + 1)}>
          <Ionicons name="add" size={20} color="#007AFF" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.removeButton}
          onPress={() => removeItem(item.id)}>
          <Ionicons name="trash" size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.stepContent}>
      {/*<Text style={styles.stepTitle}>Revisar Productos</Text>
      
      <FlatList
        data={carritoItems}
        renderItem={renderCarritoItem}
        keyExtractor={item => item.id.toString()}
        style={styles.cartList}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total: </Text>
        <Text style={styles.totalAmount}>${total}</Text>
      </View>*/}

      <TouchableOpacity style={styles.nextButton} onPress={onNext}>
        <Text style={styles.nextButtonText}>Continuar</Text>
        <Ionicons name="arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

// Paso 2: Información de Envío
function ShippingStep({ shippingInfo, setShippingInfo, onNext, onBack }) {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!shippingInfo.nombre.trim()) newErrors.nombre = 'Nombre requerido';
    if (!shippingInfo.direccion.trim()) newErrors.direccion = 'Dirección requerida';
    if (!shippingInfo.ciudad.trim()) newErrors.ciudad = 'Ciudad requerida';
    if (!shippingInfo.telefono.trim()) newErrors.telefono = 'Teléfono requerido';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <ScrollView style={styles.stepContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.stepTitle}>Información de Envío</Text>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre Completo *</Text>
        <TextInput
          style={[styles.input, errors.nombre && styles.inputError]}
          value={shippingInfo.nombre}
          onChangeText={(text) => setShippingInfo({...shippingInfo, nombre: text})}
          placeholder="Ej: Juan Pérez"
        />
        {errors.nombre && <Text style={styles.errorText}>{errors.nombre}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Dirección *</Text>
        <TextInput
          style={[styles.input, errors.direccion && styles.inputError]}
          value={shippingInfo.direccion}
          onChangeText={(text) => setShippingInfo({...shippingInfo, direccion: text})}
          placeholder="Ej: Calle Principal 123"
          multiline
        />
        {errors.direccion && <Text style={styles.errorText}>{errors.direccion}</Text>}
      </View>

      <View style={styles.formRow}>
        <View style={[styles.formGroup, styles.formHalf]}>
          <Text style={styles.label}>Ciudad *</Text>
          <TextInput
            style={[styles.input, errors.ciudad && styles.inputError]}
            value={shippingInfo.ciudad}
            onChangeText={(text) => setShippingInfo({...shippingInfo, ciudad: text})}
            placeholder="Ciudad"
          />
          {errors.ciudad && <Text style={styles.errorText}>{errors.ciudad}</Text>}
        </View>

        <View style={[styles.formGroup, styles.formHalf]}>
          <Text style={styles.label}>Código Postal</Text>
          <TextInput
            style={styles.input}
            value={shippingInfo.codigoPostal}
            onChangeText={(text) => setShippingInfo({...shippingInfo, codigoPostal: text})}
            placeholder="12345"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Teléfono *</Text>
        <TextInput
          style={[styles.input, errors.telefono && styles.inputError]}
          value={shippingInfo.telefono}
          onChangeText={(text) => setShippingInfo({...shippingInfo, telefono: text})}
          placeholder="Ej: +52 555 123 4567"
          keyboardType="phone-pad"
        />
        {errors.telefono && <Text style={styles.errorText}>{errors.telefono}</Text>}
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={20} color="#007AFF" />
          <Text style={styles.backButtonText}>Atrás</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Continuar</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Paso 3: Método de Pago
function PaymentStep({ paymentInfo, setPaymentInfo, onNext, onBack }) {
  const paymentMethods = [
    { id: 'card', name: 'Tarjeta de Crédito/Débito', icon: 'card' },
    { id: 'paypal', name: 'PayPal', icon: 'logo-paypal' },
    { id: 'cash', name: 'Pago en Efectivo', icon: 'cash' },
  ];

  return (
    <ScrollView style={styles.stepContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.stepTitle}>Método de Pago</Text>
      
      <View style={styles.paymentMethods}>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.paymentMethod,
              paymentInfo.metodo === method.id && styles.paymentMethodSelected
            ]}
            onPress={() => setPaymentInfo({...paymentInfo, metodo: method.id})}>
            <Ionicons 
              name={method.icon} 
              size={24} 
              color={paymentInfo.metodo === method.id ? '#007AFF' : '#666'} 
            />
            <Text style={[
              styles.paymentMethodText,
              paymentInfo.metodo === method.id && styles.paymentMethodTextSelected
            ]}>
              {method.name}
            </Text>
            <View style={[
              styles.radioButton,
              paymentInfo.metodo === method.id && styles.radioButtonSelected
            ]}>
              {paymentInfo.metodo === method.id && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {paymentInfo.metodo === 'card' && (
        <View style={styles.cardForm}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Número de Tarjeta</Text>
            <TextInput
              style={styles.input}
              placeholder="1234 5678 9012 3456"
              keyboardType="numeric"
              maxLength={19}
            />
          </View>

          <View style={styles.formRow}>
            <View style={[styles.formGroup, styles.formHalf]}>
              <Text style={styles.label}>Vencimiento</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/AA"
                keyboardType="numeric"
                maxLength={5}
              />
            </View>

            <View style={[styles.formGroup, styles.formHalf]}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.input}
                placeholder="123"
                keyboardType="numeric"
                maxLength={4}
                secureTextEntry
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Nombre en la Tarjeta</Text>
            <TextInput
              style={styles.input}
              placeholder="Juan Pérez"
            />
          </View>
        </View>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={20} color="#007AFF" />
          <Text style={styles.backButtonText}>Atrás</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.nextButton, !paymentInfo.metodo && styles.nextButtonDisabled]} 
          onPress={onNext}
          disabled={!paymentInfo.metodo}>
          <Text style={styles.nextButtonText}>Continuar</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Paso 4: Confirmación
function ConfirmationStep({ carritoItems, shippingInfo, paymentInfo, onComplete, onBack }) {
  const total = carritoItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  const shipping = 50; // Costo de envío
  const tax = Math.round(total * 0.16); // IVA 16%
  const finalTotal = total + shipping + tax;

  return (
    <ScrollView style={styles.stepContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.stepTitle}>Confirmar Pedido</Text>
      
      {/* Resumen de productos */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryCardTitle}>Productos ({carritoItems.length})</Text>
        {carritoItems.map((item) => (
          <View key={item.id} style={styles.summaryItem}>
            <Text style={styles.summaryItemName}>{item.nombre} x{item.cantidad}</Text>
            <Text style={styles.summaryItemPrice}>${item.precio * item.cantidad}</Text>
          </View>
        ))}
      </View>

      {/* Información de envío */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryCardTitle}>Envío</Text>
        <Text style={styles.summaryText}>{shippingInfo.nombre}</Text>
        <Text style={styles.summaryText}>{shippingInfo.direccion}</Text>
        <Text style={styles.summaryText}>{shippingInfo.ciudad}, {shippingInfo.codigoPostal}</Text>
        <Text style={styles.summaryText}>{shippingInfo.telefono}</Text>
      </View>

      {/* Método de pago */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryCardTitle}>Pago</Text>
        <Text style={styles.summaryText}>
          {paymentInfo.metodo === 'card' ? 'Tarjeta de Crédito/Débito' :
           paymentInfo.metodo === 'paypal' ? 'PayPal' : 'Pago en Efectivo'}
        </Text>
      </View>

      {/* Total */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryCardTitle}>Resumen</Text>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryText}>Subtotal</Text>
          <Text style={styles.summaryText}>${total}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryText}>Envío</Text>
          <Text style={styles.summaryText}>${shipping}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryText}>IVA (16%)</Text>
          <Text style={styles.summaryText}>${tax}</Text>
        </View>
        <View style={[styles.summaryItem, styles.summaryTotal]}>
          <Text style={styles.summaryTotalText}>Total</Text>
          <Text style={styles.summaryTotalText}>${finalTotal}</Text>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={20} color="#007AFF" />
          <Text style={styles.backButtonText}>Atrás</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.completeButton} onPress={onComplete}>
          <Text style={styles.completeButtonText}>Completar Pedido</Text>
          <Ionicons name="checkmark" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Pantalla del carrito con stepper
function CarritoScreen({ navigation }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [carritoItems, setCarritoItems] = useState([
    { id: 1, nombre: 'iPhone 15', cantidad: 1, precio: 999 },
    { id: 2, nombre: 'AirPods Pro', cantidad: 2, precio: 249 },
  ]);
  
  const [shippingInfo, setShippingInfo] = useState({
    nombre: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    telefono: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    metodo: '',
  });

  const steps = ['Carrito', 'Envío', 'Pago', 'Confirmar'];

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCarritoItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, cantidad: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCarritoItems(prev => prev.filter(item => item.id !== id));
  };

  const handleComplete = () => {
    Alert.alert(
      '¡Pedido Confirmado!',
      'Tu pedido ha sido procesado exitosamente. Recibirás un email de confirmación.',
      [
        {
          text: 'OK',
          onPress: () => {
            setCurrentStep(0);
            navigation.navigate('HomeTab');
          }
        }
      ]
    );
  };

  if (carritoItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyCart}>
          <Ionicons name="cart-outline" size={80} color="#ccc" />
          <Text style={styles.emptyCartText}>Tu carrito está vacío</Text>
          <TouchableOpacity 
            style={styles.nextButton}
            onPress={() => navigation.navigate('HomeTab')}>
            <Text style={styles.nextButtonText}>Ir de compras</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header con stepper */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{steps[currentStep]}</Text>
        <StepIndicator currentStep={currentStep} totalSteps={4} />
      </View>

      {/* Contenido del paso actual */}
      <View style={styles.stepContainer}>
        {currentStep === 0 && (
          <CartReviewStep
            carritoItems={carritoItems}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
            onNext={() => setCurrentStep(1)}
          />
        )}
        
        {currentStep === 1 && (
          <ShippingStep
            shippingInfo={shippingInfo}
            setShippingInfo={setShippingInfo}
            onNext={() => setCurrentStep(2)}
            onBack={() => setCurrentStep(0)}
          />
        )}
        
        {currentStep === 2 && (
          <PaymentStep
            paymentInfo={paymentInfo}
            setPaymentInfo={setPaymentInfo}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        )}
        
        {currentStep === 3 && (
          <ConfirmationStep
            carritoItems={carritoItems}
            shippingInfo={shippingInfo}
            paymentInfo={paymentInfo}
            onComplete={handleComplete}
            onBack={() => setCurrentStep(2)}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

function ConfiguracionScreen({ route, navigation }) {
  const { usuario } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Configuración</Text>
      <Text style={styles.textoInfo}>Usuario: {usuario.nombre}</Text>
      <Text style={styles.textoInfo}>Email: {usuario.email}</Text>
      
      <TouchableOpacity 
        style={styles.botonSecundario}
        onPress={() => navigation.goBack()}>
        <Text style={styles.textoBotonSecundario}>Volver al Perfil</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
}

// Navegador de pestañas (SIN HEADERS)
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // ¡IMPORTANTE! Esto quita todos los headers
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
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          paddingTop: 5,
          paddingBottom: 5,
          height: 60,
        },
      })}>
      
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Inicio',
        }}
      />
      
      <Tab.Screen 
        name="CarritoTab" 
        component={CarritoScreen}
        options={{
          tabBarLabel: 'Carrito',
        }}
      />
      
      <Tab.Screen 
        name="PerfilTab" 
        component={PerfilScreen}
        options={{
          tabBarLabel: 'Perfil',
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Configuracion" component={ConfiguracionScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ============ ESTILOS ============
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  
  // Header sin barra de sistema
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },

  // Stepper
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCompleted: {
    backgroundColor: '#28a745',
  },
  stepActive: {
    backgroundColor: '#007AFF',
  },
  stepInactive: {
    backgroundColor: '#e0e0e0',
  },
  stepText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepTextActive: {
    color: '#fff',
  },
  stepTextInactive: {
    color: '#666',
  },
  stepLine: {
    width: 40,
    height: 2,
    marginHorizontal: 5,
  },
  stepLineCompleted: {
    backgroundColor: '#28a745',
  },
  stepLineInactive: {
    backgroundColor: '#e0e0e0',
  },

  // Contenido de pasos
  stepContainer: {
    flex: 1,
  },
  stepContent: {
    flex: 1,
    padding: 20,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },

  // Carrito
  cartList: {
    flex: 1,
  },
  cartItemCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ffebee',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  totalCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
    color: '#333',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },

  // Formularios
  formGroup: {
    marginBottom: 20,
  },
  formRow: {
    flexDirection: 'row',
    gap: 15,
  },
  formHalf: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 5,
  },

  // Métodos de pago
  paymentMethods: {
    marginBottom: 20,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  paymentMethodSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f8ff',
  },
  paymentMethodText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  paymentMethodTextSelected: {
    color: '#007AFF',
    fontWeight: '600',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#007AFF',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  cardForm: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginTop: 15,
  },

  // Resumen/Confirmación
  summaryCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  summaryCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  summaryItemName: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  summaryItemPrice: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  summaryText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  summaryTotal: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
    marginTop: 10,
  },
  summaryTotalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  // Botones
  buttonRow: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 20,
  },
  nextButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 10,
  },
  nextButtonDisabled: {
    backgroundColor: '#ccc',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
    gap: 10,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  completeButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 10,
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Carrito vacío
  emptyCart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyCartText: {
    fontSize: 18,
    color: '#666',
    marginTop: 20,
    marginBottom: 30,
  },

  // Estilos originales que mantienes
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  lista: {
    flex: 1,
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
  perfilContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    margin: 20,
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