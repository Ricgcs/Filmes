import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, TextInput, FlatList, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import RadioGroup from 'react-native-radio-buttons-group';

const { width, height } = Dimensions.get('window');

function Title() {
  return (
    <Text style={styles.title}>Jorge Flix</Text>
  );
}

function HomeScreen({ navigation }) {
  const [selectedOption, setSelectedOption] = useState('');
  const [filmName, setFilmName] = useState('');
  const [duration, setDuration] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [image, setImage] = useState(null);
  const [results, setResults] = useState([]);
  
  // Estados para rastrear o foco dos TextInput
  const [isFilmNameFocused, setFilmNameFocused] = useState(false);
  const [isDurationFocused, setDurationFocused] = useState(false);
  const [isReleaseYearFocused, setReleaseYearFocused] = useState(false);

  const options = [
    { id: '1', label: 'Romance' },
    { id: '2', label: 'Ação' },
    { id: '3', label: 'Aventura' },
    { id: '4', label: 'Terror' },
  ];

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Você precisa permitir o acesso à galeria!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!filmName || !duration || !releaseYear || !selectedOption || !image) {
      alert('Por favor, preencha todos os campos e selecione uma imagem!');
      return;
    }

    const filmData = {
      filmName,
      duration,
      releaseYear,
      genre: options.find(option => option.id === selectedOption)?.label,
      image,
    };

    setResults((prevResults) => [...prevResults, filmData]);

    setFilmName('');
    setDuration('');
    setReleaseYear('');
    setSelectedOption('');
    setImage(null);
  };

  const handleNavigate = () => {
    navigation.navigate('JorgeFlix', { results });
  };

  return (
    <View style={styles.container}>
      <Title /> {/* Componente de título adicionado */}
      <Text style={styles.text_input}>Nome do Filme</Text>
      <TextInput
        style={[
          styles.input_dois,
          {
            backgroundColor: isFilmNameFocused ? 'white' : 'transparent',
            color: isFilmNameFocused ? 'black' : 'white',
          },
        ]}
        placeholder="Nome do filme"
        placeholderTextColor="white"
        value={filmName}
        onChangeText={setFilmName}
        onFocus={() => setFilmNameFocused(true)}
        onBlur={() => setFilmNameFocused(false)}
      />

      <Text style={styles.text_input}>Tempo de Duração</Text>
      <TextInput
        style={[
          styles.input_dois,
          {
            backgroundColor: isDurationFocused ? 'white' : 'transparent',
            color: isDurationFocused ? 'black' : 'white',
          },
        ]}
        keyboardType="numeric"
        placeholder="Tempo de duração"
        placeholderTextColor="white"
        value={duration}
        onChangeText={setDuration}
        onFocus={() => setDurationFocused(true)}
        onBlur={() => setDurationFocused(false)}
      />

      <Text style={styles.text_input}>Ano de Lançamento</Text>
      <TextInput
        style={[
          styles.input_dois,
          {
            backgroundColor: isReleaseYearFocused ? 'white' : 'transparent',
            color: isReleaseYearFocused ? 'black' : 'white',
          },
        ]}
        placeholder="Ano de lançamento"
        placeholderTextColor="white"
        value={releaseYear}
        onChangeText={setReleaseYear}
        onFocus={() => setReleaseYearFocused(true)}
        onBlur={() => setReleaseYearFocused(false)}
      />

      <Text style={styles.text_input}>Selecionar Gênero</Text>
      <RadioGroup
        radioButtons={options.map(option => ({ ...option, label: option.label }))}
        onPress={setSelectedOption}
        selectedId={selectedOption}
        layout="row"
        labelStyle={styles.radioLabel} // Estilo adicionado
      />

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.text_button}>Selecionar Imagem</Text>
      </TouchableOpacity>

      {image && (
        <Image source={{ uri: image }} style={styles.previewImage} />
      )}

      <View style={styles.igual}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.text_button}>Enviar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleNavigate}>
          <Text style={styles.text_button}>Ver Resultados</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ResultsScreen({ navigation, route }) {
  const { results } = route.params;
  const options = [
    { id: '1', label: 'Romance' },
    { id: '2', label: 'Ação' },
    { id: '3', label: 'Aventura' },
    { id: '4', label: 'Terror' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Title /> {/* Componente de título adicionado */}
      {options.map((option) => {
        const filteredResults = results.filter(result => result.genre === option.label);
        return (
          <View key={option.id} style={styles.sectionContainer}>
            {/* Faixa horizontal */}
            <View style={styles.sectionBar} />
            <Text style={styles.genre_title}>{option.label}</Text>
            <FlatList
              data={filteredResults}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate('FilmDetails', { film: item })}>
                  {item.image && (
                    <Image source={{ uri: item.image }} style={styles.resultImage} />
                  )}
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={<Text style={styles.empty_message}>Nenhum filme encontrado.</Text>}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.flatListContent}
            />
          </View>
        );
      })}
    </ScrollView>
  );
}

function FilmDetailsScreen({ route }) {
  const { film } = route.params;

  return (
    <View style={styles.container}>
      <Title /> {/* Componente de título adicionado */}
      <Text style={styles.genre_title}>Detalhes do Filme</Text>
      <Image source={{ uri: film.image }} style={styles.resultImage} />
      <Text style={styles.item}>Nome: {film.filmName}</Text>
      <Text style={styles.item}>Duração: {film.duration}</Text>
      <Text style={styles.item}>Ano de Lançamento: {film.releaseYear}</Text>
      <Text style={styles.item}>Gênero: {film.genre}</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="JorgeFlix" component={ResultsScreen} />
        <Stack.Screen name="FilmDetails" component={FilmDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: 'white',
  },
  
  igual: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  input: {
    height: height * 0.04,
    color: "white",
  },

  text_input: {
    color: "white",
    textAlign: "center",
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: height * 0.04,
  },

  input_dois: {
    height: height * 0.05,
    borderWidth: 2,
    borderColor: 'white',
    width: width * 0.9,
    textAlign: "center",
    borderRadius: 15,
    color: 'white',
    paddingHorizontal: 10, // Adiciona preenchimento interno
  },

  text_button: {
    color: "white",
  },

  container: {
    flex: 1,
    backgroundColor: '#000', // Alterado para preto
    padding: 20,
  },

  button: {
    height: height * 0.05,
    width: width * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: "red", // Alterado para vermelho
    margin: 5,
  },

  item: {
    padding: 10,
    fontSize: 16,
    height: 44,
    color: 'white',
  },

  genre_title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'white',
  },

  empty_message: {
    color: 'gray',
    fontStyle: 'italic',
  },

  previewImage: {
    width: width * 0.8,
    height: height * 0.3,
    marginVertical: 10,
    borderRadius: 10,
  },

  resultImage: {
    width: width * 0.5,
    height: height * 0.25,
    margin: 5,
    borderRadius: 10,
  },

  flatListContent: {
    paddingVertical: 10,
  },

  radioLabel: {
    color: 'white', // Cor do texto do RadioGroup
  },

  sectionContainer: {
    marginVertical: 20,
  },

  sectionBar: {
    height: 4,
    backgroundColor: 'gray',
    marginVertical: 10,
  },
});
