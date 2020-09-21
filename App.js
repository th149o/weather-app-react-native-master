import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { WEATHER_API_KEY } from 'react-native-dotenv';
import ReloadIcon from './components/ReloadIcon';
import Toggle from './components/Switch';
import UnitsPicker from './components/UnitsPicker';
import WeatherDetails from './components/WeatherDetails';
import WeatherInfo from './components/WeatherInfo';
import { colors } from './utils/index';

  

const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {
    const [errorMessage, setErrorMessage] = useState(null)
    const [currentWeather, setCurrentWeather] = useState(null)
    const [unitsSystem, setUnitsSystem] = useState('metric')
    const [dark, setDark] = useState(false);
    const [color, setcolor] = useState(false);

    

    useEffect(() => {
        load()
    }, [unitsSystem])

    async function load() {
        setCurrentWeather(null)
        setErrorMessage(null)
        try {
            let { status } = await Location.requestPermissionsAsync()

            if (status !== 'granted') {
                setErrorMessage('Access to location is needed to run the app')
                return
            }
            const location = await Location.getCurrentPositionAsync()

            const { latitude, longitude } = location.coords

            const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`

            const response = await fetch(weatherUrl)

            const result = await response.json()

            if (response.ok) {
                setCurrentWeather(result)
            } else {
                setErrorMessage(result.message)
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
    }
    if (currentWeather) {
        return (
                <View style={dark?styles.container:styles.containerDark}>
                    <StatusBar style='auto' />
                    <View style={styles.main}>
                    <Toggle onDarkModeChange={()=> setDark(!dark) }darkModeValue={dark}/>
                        <UnitsPicker setcolor={setcolor} color={color} setUnitsSystem={setUnitsSystem} darkModeValue={dark} />
                        <ReloadIcon load={load} />
                        <WeatherInfo currentWeather={currentWeather} darkModeValue={dark} />
                    </View>
                    <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem} darkModeValue={dark} />
                </View>
        )
    } else if (errorMessage) {
        return (
            <View style={styles.container}>
                <ReloadIcon load={load} />
                <Text style={{ textAlign: 'center' }}>{errorMessage}</Text>
                <StatusBar style="auto" />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
                <StatusBar style="auto" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    main: {
        justifyContent: 'center',
        flex: 1,
    },
    containerDark: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#111317'
    }
})
