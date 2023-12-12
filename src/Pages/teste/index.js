import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, Image, View, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import { useTheme } from 'react-native-paper';

import CategoriaService from '../../services/categorias';
import AutorService from '../../services/autores';
import ImageService from '../../services/images';
import TituloService from '../../services/titulos';

export default function Teste({ navigation }) {
  const theme = useTheme();

  const [isFocus, setIsFocus] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [titulo, setTitulo] = useState({
    titulo: '',
    autor: '',
    categoria: '',
  });

  const [categorias, setCategorias] = useState([]);

  const getCategorias = async () => {
    const data = await CategoriaService.getAllCategorias();
    setCategorias(data);
  };

  useEffect(() => {
    getCategorias();
  }, []);
  
  const [autores, setAutores] = useState([]);

  const getAutores = async () => {
    const data = await AutorService.getAllAutores();
    setAutores(data);
  };

  useEffect(() => {
    getAutores();
  }, []);

  const save = async () => {
    const image = await ImageService.uploadImage(file);
    setTitulo((titulo) => ({
      ...titulo,
      capa_attachment_key: image.attachment_key,
    }));
    const data = await TituloService.saveTitulo(titulo);
    navigation.goBack();
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setFile(result.assets[0]);
    } else {
      alert('Você não selecionou nenhuma imagem.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={styles.image}
          onPress={pickImageAsync}
        />
      )}
      {!selectedImage && (
        <View style={styles.buttons}>
          <Button mode="contained" onPress={pickImageAsync}>
            Selecionar imagem
          </Button>
        </View>
      )}
      <View style={{ marginHorizontal: 10 }}>
        <TextInput
          label="Título"
          style={{ marginBottom: 10 }}
          onChangeText={(text) =>
            setTitulo((titulo) => ({ ...titulo, titulo: text }))
          }
        />
        <Dropdown
          style={[
            styles.dropdown,
            {
              backgroundColor: theme.colors.surfaceVariant,
            },
            isFocus && {
              borderBottomColor: theme.colors.primary,
              borderBottomWidth: 1.5,
            },
          ]}
          containerStyle={[
            {
              backgroundColor: theme.colors.surfaceVariant,
            },
          ]}
          placeholderStyle={styles.placeholderStyle}
          itemContainerStyle={[
            {
              backgroundColor: theme.colors.surfaceVariant,
            },
          ]}
          selectedTextStyle={styles.selectedTextStyle}
          data={categorias}
          maxHeight={300}
          labelField="descricao"
          valueField="id"
          placeholder={isFocus ? '...' : 'Selecionar Categoria'}
          value={titulo.categoria}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setTitulo((titulo) => ({ ...titulo, categoria: item.id }));
            setIsFocus(false);
          }}
        />
        <Dropdown
          style={[
            styles.dropdown,
            {
              backgroundColor: theme.colors.surfaceVariant,
            },
            isFocus && {
              borderBottomColor: theme.colors.primary,
              borderBottomWidth: 1.5,
            },
          ]}
          containerStyle={[
            {
              backgroundColor: theme.colors.surfaceVariant,
            },
          ]}
          placeholderStyle={styles.placeholderStyle}
          itemContainerStyle={[
            {
              backgroundColor: theme.colors.surfaceVariant,
            },
          ]}
          selectedTextStyle={styles.selectedTextStyle}
          data={autores}
          maxHeight={300}
          labelField="nome"
          valueField="id"
          placeholder={isFocus ? '...' : 'Selecionar Autor'}
          value={titulo.autor}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setTitulo((titulo) => ({ ...titulo, autor: item.id }));
            setIsFocus(false);
          }}
        />
      </View>
      <View style={styles.buttons}>
        <Button mode="contained" onPress={save}>
          Adicionar
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
  dropdown: {
    height: 55,
    borderBottomColor: '#000a',
    borderBottomWidth: 0.8,
    borderTopRadius: 4,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#000a',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 20,
  },
});