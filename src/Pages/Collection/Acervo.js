import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Modal, TextInput,
} from "react-native";

const Acervo = () => {
  const [books, setBooks] = useState([
    {
      id: 1,
      titulo: "Livro 1",
      autor: "Autor 1",
      coverImage: "https://via.placeholder.com/150",
      sinopse:
        "Sinopse do Livro 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique tristique leo. ",
      available: true,
      details: {
        idioma: "Português",
        paginas: 300,
        categoria: "Ficção",
        ano: 2022,
      },
    },
    {
      id: 2,
      titulo: "Livro 2",
      autor: "Autor 2",
      coverImage: "https://via.placeholder.com/150",
      sinopse:
        "Sinopse do Livro 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique tristique leo. ",
      available: false,
      details: {
        idioma: "Inglês",
        paginas: 250,
        categoria: "Não Ficção",
        ano: 2021,
      },
    },
    {
      id: 3,
      titulo: "Livro 3",
      autor: "Autor 3",
      coverImage: "https://via.placeholder.com/150",
      sinopse:
        "Sinopse do Livro 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tristique tristique leo. ",
      available: true,
      details: {
        idioma: "Espanhol",
        paginas: 200,
        categoria: "Romance",
        ano: 2020,
      },
    },
  ]);

  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [borrowerName, setBorrowerName] = useState("");

  const toggleModal = (book) => {
    setSelectedBook(book);
    setBorrowerName("");
    setModalVisible(!isModalVisible);
  };

  const handleBorrow = () => {
    ///implementar api se quiser
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Acervo da Biblioteca</Text>
      <ScrollView style={styles.booksContainer}>
        {books.map((book) => (
          <TouchableOpacity key={book.id} onPress={() => toggleModal(book)}>
            <View style={styles.bookContainer}>
              <Image
                source={{ uri: book.coverImage }}
                style={styles.bookImage}
              />
              <View style={styles.bookInfo}>
                <Text style={styles.bookTitulo}>{book.titulo}</Text>
                <Text style={styles.bookAuthor}>Autor: {book.autor}</Text>
              </View>
              <Text
                style={book.available ? styles.available : styles.notAvailable}
              >
                {book.available ? "Disponível" : "Indisponível"}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => toggleModal()}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Detalhes do Livro</Text>
            <Image
              source={{ uri: selectedBook?.coverImage }}
              style={styles.modalImage}
            />
            <Text style={styles.modalBookTitulo}>{selectedBook?.titulo}</Text>
            <Text style={styles.modalBookAuthor}>
              Autor: {selectedBook?.autor}
            </Text>
            <Text style={styles.modalSynopsis}>{selectedBook?.sinopse}</Text>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailText}>
                Idioma: {selectedBook?.details.idioma}
              </Text>
              <Text style={styles.detailText}>
                Páginas: {selectedBook?.details.paginas}
              </Text>
              <Text style={styles.detailText}>
                Categoria: {selectedBook?.details.categoria}
              </Text>
              <Text style={styles.detailText}>
                Ano de Publicação: {selectedBook?.details.ano}
              </Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Seu nome"
              value={borrowerName}
              onChangeText={(text) => setBorrowerName(text)}
            />
            <TouchableOpacity
              style={styles.borrowButton}
              onPress={handleBorrow}
            >
              <Text style={styles.borrowButtonText}>Emprestar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => toggleModal()}
            >
              <Text style={styles.closeButtonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
