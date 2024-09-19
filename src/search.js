import { View, Text, TextInput, Dimensions, StyleSheet } from "react-native";
import React, { useState } from "react";
import { EvilIcons } from "@expo/vector-icons";

const WeatherSearch = ({ fetchWeatherData }) => {
  const [cityName, setCityName] = useState("");

  return (
    <View style={styles.searchBar}>
      <TextInput
        placeholder="Şehir ismi giriniz..."
        style={{ flex: 1 }}
        value={cityName}
        onChangeText={(text) => {
          setCityName(text);
        }}
      />
      <EvilIcons
        name="search"
        size={28}
        color="black"
        onPress={() => fetchWeatherData(cityName)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: Dimensions.get("window").width - 20,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "lightgray",
    borderRadius: 25,
  },
});

export default WeatherSearch;
