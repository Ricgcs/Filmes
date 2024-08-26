import { StatusBar } from 'expo-status-bar';
import { Dimensions } from "react-native";
import { StyleSheet, Text, Touchable, View, Image, useState} from 'react-native';
import { width } from './src/screans/constants/medidas';
import { height } from './src/screans/constants/medidas';
import { TouchableOpacity } from 'react-native-web';

import { useNavigation } from '@react-navigation/native';


export default function Sub(props) {

  return (
    <View>
<TouchableOpacity style={styles.subs} >{props.nome}</TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
subs:{
    color:"white",
    fontSize:height*0.042,
    borderColor:"black",
    borderRadius: 10,
    backgroundColor:"blue",
    padding:"1%"
},
});