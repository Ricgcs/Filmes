import { StatusBar } from 'expo-status-bar';
import { Dimensions } from "react-native";
import { StyleSheet, Text, Touchable, View, Image, useState} from 'react-native';
import { width } from './src/screans/constants/medidas';
import { height } from './src/screans/constants/medidas';
import { TouchableOpacity } from 'react-native-web';
import Texto from './src/screans/componentes/Texto';

export default function App() {
const [nome, setnome] = useState(null)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style = {styles.menu}>
      <Image
      source={require('./src/screans/imagem/menu.png')}
      style={styles.imagem_menu}
      />
        </TouchableOpacity>     
        
        <Text style={styles.titulo}>Films day</Text>

        <Texto filmes = {teste}/>
        <StatusBar style="auto" />
      </View>


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
marginLeft:width*0.13,
 },

 imagem_menu:{
width:width*0.12,
height:height*0.06,
 }
});