import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { CurrencyConverterModel } from "../models/CurrencyConverterModel";

const exchangeRates = {
  USD: 1,    // Dólar estadounidense (moneda base)
  MXN: 20,   // Peso mexicano
  EUR: 0.85, // Euro
  JPY: 130,  // Yen japonés
  CNY: 6.5,  // Yuan chino
};

const model = new CurrencyConverterModel(exchangeRates);

export default function CurrencyConverter() {
  const [amount1, setAmount1] = useState("1");
  const [currency1, setCurrency1] = useState("MXN");
  const [amount2, setAmount2] = useState("0.00");
  const [currency2, setCurrency2] = useState("USD");

  useEffect(() => {
    convertAmount(amount1, currency1, currency2, setAmount2);
  }, [amount1, currency1, currency2]);

  const convertAmount = (
    amount: string,
    from: string,
    to: string,
    setResult: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const value = parseFloat(amount);
    if (!isNaN(value)) {
      const converted = model.convert(value, from, to);
      setResult(converted.toFixed(2));
    } else {
      setResult("0.00");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💰 Conversor de Monedas</Text>
      <View style={styles.row}>
        <TextInput
          value={amount1}
          onChangeText={(text) => setAmount1(text === "" ? "0.00" : text)}
          keyboardType="numeric"
          style={styles.input}
        />
        <Picker
          selectedValue={currency1}
          onValueChange={(itemValue) => setCurrency1(itemValue)}
          style={styles.picker}
        >
          {Object.keys(exchangeRates).map((currency) => (
            <Picker.Item key={currency} label={currency} value={currency} />
          ))}
        </Picker>
      </View>

      <View style={styles.row}>
        <TextInput
          value={amount2}
          onChangeText={(text) => convertAmount(text === "" ? "0.00" : text, currency2, currency1, setAmount1)}
          keyboardType="numeric"
          style={styles.input}
        />
        <Picker
          selectedValue={currency2}
          onValueChange={(itemValue) => setCurrency2(itemValue)}
          style={styles.picker}
        >
          {Object.keys(exchangeRates).map((currency) => (
            <Picker.Item key={currency} label={currency} value={currency} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    backgroundColor: "#2E2E2E",
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: "#fff",
    fontSize: 18,
    paddingHorizontal: 10,
  },
  picker: {
    width: 150,
    color: "#fff",
  },
});
