import React, {useState} from "react";
import { View, ScrollView, TextInput, TouchableOpacity, StyleSheet, Text } from "react-native";
import NavBar  from "./components/Nav";
import Header from "./components/Forms/Header";
import DataCliente from "./components/Forms/Data_cliente";
import Container from "./components/Container";
import FormContainer from "./components/Forms/Form_container";
import Datos_equipo from "./components/Forms/Nom85/Datos_equipo";

export default function Nom85(){
    return(
        <ScrollView>
            {/*Importanción de la Navbar */}
            <NavBar/>

            <Container>
                <FormContainer>
                    <Header titulo={"Formulario de Norma 085"}/>
                    <DataCliente fechaEvaluacion={"01-06-25"} razon_social={"Walmart S.A de C.V"} />
                </FormContainer>

                <FormContainer>
                    <Datos_equipo />
                </FormContainer>
            </Container>
        </ScrollView>
    );
}
