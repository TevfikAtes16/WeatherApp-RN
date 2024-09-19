import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import WeatherInfo from "./WeatherInfo";

const API_KEY = "Your API Key";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const fetchWeatherData = async (cityName) => {
    try {
      setLoaded(false);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      if (response.status == 200) {
        const data = await response.json();
        setWeatherData(data);
        // console.log(data);
      } else {
        Alert.alert("Error", "City not found", [{ text: "OK" }]);
        setWeatherData(null);
      }
      setLoaded(true);
    } catch (error) {
      Alert.alert("Error", error.message, [{ text: "OK" }]);
    }
  };

  useEffect(() => {
    fetchWeatherData("İnegöl");
  }, []);

  if (!loaded) {
    return (
      <View style={styles.header}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hava Durumu</Text>
      </View>
      <WeatherInfo
        weatherData={weatherData}
        fetchWeatherData={fetchWeatherData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF5DB",
    paddingTop: Constants.statusBarHeight,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C5D2EF",
    height: 80,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Weather;
