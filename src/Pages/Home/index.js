import React from "react-native";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Header from "../../components/Header";
import News from "../News";
import { useState } from "react";

export default function Home() {
  const navigation = useNavigation();
  const [news, setNews] = useState([
    {
      id: "1",
      titulo: "Nova Seção de Livros Infantis",
      content:
        "A biblioteca está animada em anunciar uma nova seção dedicada a livros infantis! Venha explorar uma variedade de histórias para crianças de todas as idades.",
      imageUrl: "https://didaticalizando.com/wp-content/uploads/2023/04/9.png",
    },
    {
      id: "2",
      titulo: "Clube de Leitura: Próximo Encontro",
      content:
        'Nosso clube de leitura terá seu próximo encontro na próxima terça-feira, discutindo o livro "O Apanhador no Campo de Centeio". Todos são bem-vindos!',
      imageUrl:
        "https://i1.wp.com/blog.londrina.pr.gov.br/wp-content/uploads/2023/03-mar%C3%A7o/15.03.23/Clube-da-Leitura-para-Professores-banner-div-1.jpg?resize=1170%2C610&ssl=1",
    },
    {
      id: "3",
      titulo: "Exposição de Pinturas Locais",
      content:
        "A biblioteca está animada em anunciar uma nova seção dedicada a livros infantis! Venha explorar uma variedade de histórias para crianças de todas as idades.",
      imageUrl:
        "https://nova-escola-producao.s3.amazonaws.com/v3tJpNHn2XmJnwbrUkNjKhyvpfNVjYUPgkqjVjnKvwvA4vqb9GBUtXv3Rp8d/ei15mar21-brincadeirasnorte-flaviaborges-c4-texto.jpg",
    },
  ]);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollViewContent}>
        {news.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.newsItem}
            onPress={() => {
              navigation.navigate("News");
            }}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.newsImage} />
            <View style={styles.newsText}>
              <Text style={styles.newsTitulo}>{item.titulo}</Text>
              <Text style={styles.newsContent}> {item.content} </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  newsItem: {
    flexDirection: "row",
    marginBottom: 30,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
    overflow: "hidden",
  },
  newsImage: {
    flex: 1, // Ocupa todo o espaço do container
    resizeMode: "cover", // Redimensiona a imagem para cobrir o espaço
    alignSelf: "stretch", // Estica a imagem na vertical
  },
  newsText: {
    flex: 1,
    padding: 15,
  },
  newsTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#2c3e50",
  },
  newsContent: {
    fontSize: 14,
    color: "#555",
  },
});
