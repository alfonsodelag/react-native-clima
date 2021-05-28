import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableWithoutFeedback, Animated, Alert } from "react-native";
import { Picker } from '@react-native-picker/picker';

const Formulario = ({ busqueda, guardarBusqueda, guardarConsultar }) => {
    const { pais, ciudad } = busqueda;

    // La API de Animated se encarga de hacer el setState
    // ! El unico significa el tamaño, la escala
    const [animacionboton] = useState(new Animated.Value(1))

    const consultarClima = () => {
        if (pais.trim === "" || ciudad.trim() === "") {
            mostrarAlerta();
            return;
        }

        // Consultar la api
        guardarConsultar(true);
    }

    const mostrarAlerta = () => {
        Alert.alert(
            "Error",
            "Agrega una ciudad y país para la busqueda",
            [{ text: "Entendido" }]
        )
    }

    const animacionEntrada = () => {
        // Asi puedes tener diferentes animaciones y states
        Animated.spring(animacionboton, {
            // ! Esto significa "ve de 1 a 0.9"
            toValue: .75,
            useNativeDriver: false,
            // Con start arrancas la animación
        }).start();
    }

    const animacionSalida = () => {
        Animated.spring(animacionboton, {
            // ! Esto significa "ve de 1 a 0.9"
            toValue: 1,
            friction: 4,
            tension: 30,
            useNativeDriver: false,
            // Con start arrancas la animación
        }).start();
    }

    const estiloAnimacion = () => {
        transform: [{
            scale: animacionboton
        }]
    }

    return (
        <>
            <View style={styles.formulario}>
                <View>
                    <TextInput
                        value={ciudad}
                        style={styles.input}
                        onChangeText={ciudad => guardarBusqueda({ ...busqueda, ciudad })}
                        placeholder="Ciudad"
                        placeholderTextColor="#666"
                    />
                </View>
                <View>
                    <Picker
                        selectedValue={pais}
                        itemStyle={{ height: 120, backgroundColor: "#FFF" }}
                        onValueChange={pais => guardarBusqueda({ ...busqueda, pais })}
                    >
                        <Picker.Item label="- Seleccione un País -" value="" />
                        <Picker.Item label="Estados Unidos" value="US" />
                        <Picker.Item label="México" value="MX" />
                        <Picker.Item label="Argentina" value="AR" />
                        <Picker.Item label="Colombia" value="CO" />
                        <Picker.Item label="Costa Rica" value="CR" />
                        <Picker.Item label="España" value="ES" />
                        <Picker.Item label="Perú" value="PE" />
                    </Picker>
                </View>
                <TouchableWithoutFeedback
                    // ! Estos metodos no existen en TouchableHighlight
                    // Cuando presionas
                    onPressIn={() => animacionEntrada()}
                    // Cuando sueltas
                    onPressOut={() => animacionSalida()}
                    onPress={() => consultarClima()}
                >
                    <Animated.View style={[styles.btnBuscar, estiloAnimacion]}>
                        <Text style={styles.textoBuscar}>Buscar Clima</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        height: 50,
        backgroundColor: "#FFF",
        fontSize: 20,
        marginBottom: 20,
        textAlign: "center"
    },
    btnBuscar: {
        marginTop: 50,
        backgroundColor: "#000",
        padding: 10,
        justifyContent: "center"
    },
    textoBuscar: {
        color: "#FFF",
        fontWeight: "bold",
        textTransform: "uppercase",
        textAlign: "center",
        fontSize: 18
    }
});

export default Formulario;