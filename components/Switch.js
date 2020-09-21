import * as React from 'react';
import { StyleSheet, Switch, View } from 'react-native';

const Toggle = ({darkModeValue,onDarkModeChange}) => {
return(
<View  style={styles.switch}>
          <Switch
          trackColor={{ false: "#dbdbdb", true: "#111317" }}
          thumbColor={darkModeValue ? "#f4f3f4" : "#2e3642"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={onDarkModeChange} 
          value={darkModeValue}
          />
    </View>
)
}
const styles = StyleSheet.create({
  switch:{
  position:'absolute',
  height:50,
  width:100,
  top:0,
  right:20,
  marginTop:45,
  }
})

export default Toggle;