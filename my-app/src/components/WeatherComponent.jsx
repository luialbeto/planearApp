import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";

const API_KEY = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
const LATITUDE = "YOUR_LATITUDE"; // Replace with the desired latitude
const LONGITUDE = "YOUR_LONGITUDE"; // Replace with the desired longitude

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${LATITUDE}&lon=${LONGITUDE}&exclude=minutely,hourly&units=metric&appid=${API_KEY}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {weatherData && (
        <>
          <Text style={styles.text}>
            Current Temperature: {weatherData.current.temp}°C
          </Text>
          <Text style={styles.text}>
            Weather: {weatherData.current.weather[0].description}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default WeatherComponent;
