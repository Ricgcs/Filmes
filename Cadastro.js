import { StatusBar } from 'expo-status-bar';
import { Dimensions } from "react-native";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { width, height } from './src/screans/constants/medidas';
import Texto from './src/screans/componentes/Texto';
import Sub from './Sub';
import { useState } from 'react';



export default function cadastro() {

const [nome, setNome] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style = {styles.menu}>
   
        </TouchableOpacity> 
        <Text style={styles.titulo}>funciono????????</Text>

        <StatusBar style="auto" />
      </View>
      <View style={styles.subtitle}>
<Sub nome="Filmes"/>
<Sub nome="Cadastro"/>
<Sub nome="Pesquisa"/>
      </View>

    <TextInput
   onChangeText = {(teste)=>setNome(teste)} 
    />
    <Text>{nome}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191970',
 
  },
  header: {
  flexDirection:'row',
    backgroundColor:'#000080',
    height:height*0.08,
   alignItems:"center",
   justifyContent:"center",

  },
 menu:{
  backgroundColor:'	#4B0082',
  width:width*0.15,
  height:height*0.08,
  alignItems:'center',
  justifyContent:'center',
  color:'white',
 },

 titulo:{
color:"white",
fontSize:height*0.05,
marginLeft:"-10%",
 },

 imagem_menu:{
width:width*0.12,
height:height*0.06,
 },

 subtitle:{
  height:height*0.05,
  width:width,
  flexDirection:"row",
  justifyContent:"space-around"
 }
});