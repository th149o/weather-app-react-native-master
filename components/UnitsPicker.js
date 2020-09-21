import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function UnitsPicker({ color,setcolor,setUnitsSystem,darkModeValue}) {
   const metric =() => {
    setUnitsSystem('metric') 
    setcolor(false)
   }
   const metric2 =() => {
    setUnitsSystem('imperial')
    setcolor(true)
   }
    
console.log(color)

    return (
        <View style={styles.unitsSystem}>
            <View style={styles.material}>
            </View>
            <Text style={color?darkModeValue?styles.unitsText:styles.unitsTextDark:styles.unitsTextSelect}onPress={() => metric()  }>C°</Text>
            <Text style={darkModeValue?styles.unitsText:styles.unitsTextDark}> / </Text>
            <Text style={color?styles.unitsTextSelect:darkModeValue?styles.unitsText:styles.unitsTextDark} onPress={() => metric2()} >F°</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    unitsSystem: {
        flexDirection: "row",
        position: 'absolute',
        left: 20,
        height: 50,
        width: 100,
        top:50
    },
    material:{
       marginTop:10,
       marginRight:5
    },
    unitsText:{
        color: 'black',
        fontSize:18
    },
    unitsTextDark:{
        color:'white',
        fontSize:18
    },
    
    unitsTextSelect:{
        color:'red',
        fontSize:18
    }
})
