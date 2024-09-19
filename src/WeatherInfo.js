import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import WeatherSearch from "./search";
import translate from "translate";

const WeatherInfo = ({ weatherData, fetchWeatherData }) => {
  const {
    name,
    visibility,
    weather: [{ icon, description }],
    main: { temp, feels_like, humidity },
    wind: { speed },
    sys: { sunrise, sunset },
  } = weatherData;
  const [translatedDescription, setTranslatedDescription] = useState("");

  translate(description, { from: "en", to: "tr" }).then((text) => {
    const words = text.split(" ");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
    const capitalizedText = capitalizedWords.join(" ");

    setTranslatedDescription(capitalizedText);
  });

  return (
    <SafeAreaView style={styles.container}>
      <WeatherSearch fetchWeatherData={fetchWeatherData} />
      <View style={{ alignItems: "center" }}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.logo}>
          <Image
            source={{ uri: `https://openweathermap.org/img/w/${icon}.png` }}
            style={styles.largeIcon}
          />
          <Text style={styles.currentTemp}>{temp.toFixed()} °C</Text>
        </View>
      </View>
      <Text style={styles.description}>{translatedDescription}</Text>
      <View style={styles.extraInfo}>
        <View style={styles.info}>
          <Image
            style={styles.smallIcon}
            source={require("../assets/temp.png")}
          />
          <Text style={styles.infoText}>{feels_like.toFixed()} °C</Text>
          <Text style={styles.infoText}>Hissedilen</Text>
        </View>
        <View style={styles.info}>
          <Image
            style={styles.smallIcon}
            source={require("../assets/humidity.png")}
          />
          <Text style={styles.infoText}>{humidity} %</Text>
          <Text style={styles.infoText}>Nem</Text>
        </View>
      </View>
      <View style={styles.extraInfo}>
        <View style={styles.info}>
          <Image
            style={styles.smallIcon}
            source={require("../assets/visibility.png")}
          />
          <Text style={styles.infoText}>{visibility}</Text>
          <Text style={styles.infoText}>Görünürlük</Text>
        </View>
        <View style={styles.info}>
          <Image
            style={styles.smallIcon}
            source={require("../assets/windspeed.png")}
          />
          <Text style={styles.infoText}>{speed} m/s</Text>
          <Text style={styles.infoText}>Rüzgar Hızı</Text>
        </View>
      </View>
      <View style={styles.extraInfo}>
        <View style={styles.info}>
          <Image
            style={styles.smallIcon}
            source={require("../assets/sunrise.png")}
          />
          <Text style={styles.infoText}>
            {new Date(sunrise * 1000).toLocaleString("tr-TR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
          <Text style={styles.infoText}>Gün Doğumu</Text>
        </View>
        <View style={styles.info}>
          <Image
            style={styles.smallIcon}
            source={require("../assets/sunset.png")}
          />
          <Text style={styles.infoText}>
            {new Date(sunset * 1000).toLocaleString("tr-TR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
          <Text style={styles.infoText}>Gün Batımı</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
    color: "#e96e50",
    marginTop: 10,
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  largeIcon: {
    width: 180,
    height: 180,
  },
  currentTemp: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  extraInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 7,
  },
  info: {
    width: Dimensions.get("window").width / 2.5,
    backgroundColor: "#D0EAFA",
    padding: 10,
    borderRadius: 15,
    justifyContent: "center",
  },
  smallIcon: {
    width: 35,
    height: 35,
    borderRadius: 40 / 2,
    marginLeft: 50,
  },
  infoText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default WeatherInfo;
