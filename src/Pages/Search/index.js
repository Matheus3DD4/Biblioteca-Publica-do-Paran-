import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Search() {
  const [searchText, setSearchText] = useState(""); //usando useState para criar um estado e armazenar o texto da pesquisa,ainda usando useState, atualiza o valor de searchText
  const [searchHistory, setSearchHistory] = useState([]); //criando um estado que guarda o texto digitado, o set.... é oque permite atualizar o valor do primeiro elemento
  const [searchResults, setSearchResults] = useState(""); // outro estado para armazenar os resusltados da pesquisa.
  const handleSearch = () => {
    if (searchText.trim() !== "") {
      setSearchResults([
        ...searchResults,
        {
          titulo: searchText,
          imageUrl: "https://example.com/book-image.jpg", //nao esqucer url
          autor: " Autor Desconecido",
        },
        {
          //adicionar mais caso quiser, no titulo o searchText
          //que faz o nome do livro ser oque pesquisou.
          //nao esquecer de mudar na Views 'resultsContainer'
          //e no titulo.
        },
      ]);
      setSearchHistory((prevHistory) => [searchText, ...prevHistory]);
      setSearchText("");
    }
  };

  const clearHistory = () => {
    setSearchHistory([]); //limpa histórico e os resultados
    setSearchResults([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Digite o nome do livro..."
          value={searchText} //const searchText (nao esquecer)
          onChangeText={setSearchText} // segungo elemento da const
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}> Pesquisar </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.historyContainer}>
        <Text style={styles.historyTitulo}> Histórico de Pesquisa </Text>

        <FlatList //flatlist do history junto com o clear history e results
          data={searchHistory}
          renderItem={({ item }) => (
            <Text style={styles.historyItem}>{item}</Text>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        {searchHistory.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearHistory}>
            <Ionicons name="trash-outline" size={24} color="red" />
            <Text style={styles.clearButtonText}>Limpar Histórico</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.resultsContainer}>
        <FlatList
          data={searchResults}
          renderItem={({ item }) => (
            <View style={styles.bookItem}>
              <Image source={{ uri: item.imageUrl }} style={styles.bookImage} />
              <View style={styles.bookDetails}>
                <Text style={styles.bookTitulo}>{item.titulo}</Text>
                <Text style={styles.bookAuthor}>{item.autor}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "orange",
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 20,
    paddingTop: 30,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  searchButton: {
    backgroundColor: "#35AAFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    justifyContent: "center",
  },
  searchButtonText: {
    color: "white",
  },
  historyContainer: {
    flex: 1,
  },
  historyTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    alignSelf: "center",
  },
  historyItem: {
    marginBottom: 5,
    color: "#fff",
    fontSize: 14,
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  clearButtonText: {
    marginLeft: 5,
    color: "red",
  },
  resultsContainer: {
    flex: 1,
    marginTop: 20,
  },
  bookItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
  bookImage: {
    width: 50,
    height: 70,
    marginRight: 10,
  },
  bookDetails: {
    flex: 1,
  },
  bookTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  bookAuthor: {
    color: "gray",
  },
});
