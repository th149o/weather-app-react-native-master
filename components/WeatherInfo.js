import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../utils/index';


const { PRIMARY_COLOR, SECONDARY_COLOR,BORDER_COLOR } = colors

export default function WeatherInfo({ currentWeather , darkModeValue}) {
    const {
        main: { temp },
        weather: [details],
        name,
    } = currentWeather
    const { icon, main, description } = details

    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`

    return (
        <View style={styles.weatherInfo}>
            <Text style={darkModeValue?{color:'black'}:{color:'white'}}>{name}</Text>
            <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
            <Text style={styles.textPrimary}>{temp}°</Text>
            <Text style={darkModeValue?styles.weatherDescription:styles.weatherDescriptionDark}>{description}</Text>
            <Text style={darkModeValue?styles.textSecondary:styles.textSecondaryDark}>{main}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    weatherInfo: {
        alignItems: 'center',
        color:'black'
    },
    weatherDescription: {
        textTransform: 'capitalize',
        color:'black'
    },
    weatherDescriptionDark: {
        textTransform: 'capitalize',
        color:'white'
    },
    weatherIcon: {
        width: 100,
        height: 100,
    },
    textPrimary: {
        fontSize: 40,
        color: PRIMARY_COLOR,
    },
    textSecondaryDark: {
        fontSize: 20,
        color: 'white',
        fontWeight: '500',
        marginTop: 10,
    },
    textSecondary: {
        fontSize: 20,
        color: SECONDARY_COLOR,
        fontWeight: '500',
        marginTop: 10,
    },
})
