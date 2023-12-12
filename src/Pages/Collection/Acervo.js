import { useEffect, useState, useCallback } from 'react';
import { FAB } from 'react-native-paper';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity,
} from "react-native";
import TituloService from '../../services/titulos';

const Acervo = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [titulos, setTitulos] = useState([]);


  const fetchTitulos = async () => {
    const data = await TituloService.getAllTitulos();
    setTitulos(data);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchTitulos();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchTitulos();
  }, []);

  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [borrowerName, setBorrowerName] = useState("");

  const toggleModal = (titulo) => {
    setSelectedBook(titulo.id);
    setBorrowerName("");
    setModalVisible(!isModalVisible);
  };

  const handleBorrow = () => {
    ///implementar api se quiser
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => navigation.navigate('AddTitulo')}
        />
      <Text style={styles.header}>Acervo da Biblioteca</Text>
      <ScrollView style={styles.booksContainer}>
        {titulos.map((titulo) => (
          <TouchableOpacity key={titulo.id} onPress={() => toggleModal(titulo)}>
            <View style={styles.bookContainer}>
              <Image
                source={{ uri: titulo.capa.file }}
                style={styles.bookImage}
              />
              <View style={styles.bookInfo}>
                <Text style={styles.bookTitulo}>{titulo.titulo}</Text>
                <Text style={styles.bookAuthor}>Autor: {titulo.autor.nome}</Text>
                <Text style={styles.bookAuthor}>Categoria: {titulo.categoria.descricao}</Text>
              </View>
              <input type='radio'></input>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
    justifyContent: "center",
  },
  booksContainer: {
    flex: 1,
    backgroundColor: "orange",
  },
  bookContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff", // Fundo com transparência
    borderRadius: 10,
    padding: 10,
  },
  bookImage: {
    width: 100,
    height: 150,
    resizeMode: "cover",
    marginRight: 10,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitulo: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bookAuthor: {
    fontSize: 16,
    color: "gray",
  },
  available: {
    color: "green",
    fontWeight: "bold",
  },
  notAvailable: {
    color: "red",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, orange)", // Cor de fundo preta com transparência
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
  },
  modalTitulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
  modalBookTitulo: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalBookAuthor: {
    fontSize: 18,
    color: "gray",
  },
  modalSynopsis: {
    fontSize: 16,
    marginBottom: 10,
  },
  detailsContainer: {
    marginTop: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  borrowButton: {
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  borrowButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Acervo;
