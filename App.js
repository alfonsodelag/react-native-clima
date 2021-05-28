import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Clima from './components/Clima';
import Formulario from './components/Formulario';

const ocultarTeclado = () => {
  Keyboard.dismiss();
}

export default function App() {

  const [busqueda, guardarBusqueda] = useState({
    ciudad: "",
    pais: ""
  })
  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});;
  const [bgColor, guardarBgColor] = useState("rgb(71, 149, 212)");

  const bgColorApp = {
    backgroundColor: bgColor
  }

  const { ciudad, pais } = busqueda;

  const mostrarAlerta = () => {
    Alert.alert(
      "Error",
      "No hay resultados, intenta con otra ciudad o pais",
      [{ text: "Ok" }]
    )
  }

  useEffect(() => {
    const consultarClima = async () => {
      if (consultar) {
        const appId = "6352ba0f2638123a18aa2047ab9577df";
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        try {
          // ! Cuando usas fetch debes usar await dos veces
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
          guardarResultado(resultado);
          guardarConsultar(false);

          // Modifica los colores de fondo basado en la temperatura
          const kelvin = 273.15;
          const { main } = resultado;
          const actual = main.temp - kelvin;

          if (actual < 10) {
            guardarBgColor("rgb(105, 108, 149)");
          } else if (actual >= 10 && actual < 25) {
            guardarBgColor("rgb(71, 149, 212)");
          } else {
            guardarBgColor("rgb(178, 28, 61)");
          }

        } catch (error) {
          mostrarAlerta();
        }
        console.log(url);
      }
    }
    consultarClima();
  }, [consultar])

  return (
    <>
      <TouchableWithoutFeedback onPress={() => ocultarTeclado()}>
        <View style={[styles.app, bgColorApp]}>
          <View style={styles.contenido}>
            <Clima
              resultado={resultado}
            />
            <Formulario
              busqueda={busqueda}
              guardarBusqueda={guardarBusqueda}
              guardarConsultar={guardarConsultar}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: "center"
  },
  contenido: {
    marginHorizontal: "2.5%"
  }
});


