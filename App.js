import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, TextInput, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RadioGroup from 'react-native-radio-buttons-group';

const { width, height } = Dimensions.get('window');

function App({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.text_button}>Cadastro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function HomeScreen({ navigation }) {
  const [selectedOption, setSelectedOption] = useState('');
  const [filmName, setFilmName] = useState('');
  const [duration, setDuration] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [results, setResults] = useState([]);
  
  const options = [
    { id: '1', label: 'Romance' },
    { id: '2', label: 'Ação' },
    { id: '3', label: 'Aventura' },
    { id: '4', label: 'terror' },
  ];

  const handleSubmit = () => {
    if (!filmName || !duration || !releaseYear || !selectedOption) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    const filmData = {
      filmName,
      duration,
      releaseYear,
      genre: options.find(option => option.id === selectedOption)?.label,
    };

    // Adicionar o novo filme à lista de resultados
    setResults((prevResults) => [...prevResults, filmData]);

    // Limpar os campos após o envio
    setFilmName('');
    setDuration('');
    setReleaseYear('');
    setSelectedOption('');
  };

  // Navegar para a tela de resultados com os resultados
  const handleNavigate = () => {
    navigation.navigate('Results', { results });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={styles.text_input}>Nome do Filme</Text>
      <TextInput
        style={styles.input_dois}
        placeholder="Nome do filme"
        value={filmName}
        onChangeText={setFilmName}
      />
      
      <Text style={styles.text_input}>Tempo de Duração</Text>
      <TextInput
        style={styles.input_dois}
        keyboardType="numeric"
        placeholder="Tempo de duração"
        value={duration}
        onChangeText={setDuration}
      />
      
      <Text style={styles.text_input}>Ano de Lançamento</Text>
      <TextInput
        style={styles.input_dois}
        placeholder="Ano de lançamento"
        value={releaseYear}
        onChangeText={setReleaseYear}
      />
      
      <Text style={styles.text_input}>Selecionar Gênero</Text>
      <RadioGroup
        radioButtons={options.map(option => ({ ...option, label: option.label }))}
        onPress={setSelectedOption}
        selectedId={selectedOption}
        layout="row"
      />
<View style={styles.igual}>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.text_button}>Enviar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleNavigate}>
        <Text style={styles.text_button}>Ramal</Text>
      </TouchableOpacity>
</View>
    </View>
  );
}

function ResultsScreen({ route }) {
  const { results } = route.params;
  const options = [
    { id: '1', label: 'Romance' },
    { id: '2', label: 'Ação' },
    { id: '3', label: 'Aventura' },
    { id: '4', label: 'Terror' },
  ];

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Exibir FlatLists separadas por gênero */}
      {options.map((option) => {
        const filteredResults = results.filter(result => result.genre === option.label);
        return (
          <View key={option.id}>
            <Text style={styles.genre_title}>{option.label}</Text>
            <FlatList
              data={filteredResults}
              renderItem={({ item }) => (
                <Text style={styles.item}>
                  Nome: {item.filmName}, Duração: {item.duration} min, Ano: {item.releaseYear}
                </Text>
              )}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={<Text style={styles.empty_message}>Nenhum filme encontrado.</Text>}
            />
          </View>
        );
      })}
    </View>
  );
}

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
    
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;

const styles = StyleSheet.create({
igual:{
flexDirection:"row",
justifyContent:"space-between"
},

  input: {
    height: height * 0.04,
    color: "white",
  },

  text_input: {
    color: "black",
    textAlign:"center",
    fontWeight: 'bold',
    fontSize: 16,
    marginTop:height * 0.04,
    
  },

  input_dois: {
    height: height * 0.05,
    borderWidth: 2,
    borderColor: 'black',
    width: width*0.9,
    textAlign:"center",
    borderRadius: 15, 
  },

  text_button: {
    color: "white",
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: "row",
    justifyContent: "space-between",
    
  },

  button: {
    height: height * 0.05,
    width: width * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: "blue",
    margin: 5,
  },

  item: {
    padding: 10,
    fontSize: 16,
    height: 44,
  },

  genre_title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },

  empty_message: {
    color: 'gray',
    fontStyle: 'italic',
  },
});
