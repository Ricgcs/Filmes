import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Touchable, View} from 'react-native';
import { width } from '../constants/medidas';
import { height } from '../constants/medidas';
import { TouchableOpacity } from 'react-native-web';

export default function Texto(props) {
   return (
    <View>
      <Text>
          {props.filmes}
      </Text>
    </View>
    );
}
