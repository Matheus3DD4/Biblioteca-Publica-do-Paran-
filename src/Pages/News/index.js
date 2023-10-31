import React from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";

export default function News() {
  const news = {
    titulo:
      "Jornal Cândido explora o universo da teledramaturgia brasileira na edição de julho",
    content:
      "O Jornal Cândido, em sua edição de julho, traz um mergulho profundo no rico universo da teledramaturgia brasileira. Com análises de clássicos e entrevistas com atores renomados, esta edição oferece uma visão abrangente do impacto da televisão em nossa cultura.",
    imageUrl: "URL_DA_IMAGEM", // Substitua pela URL da imagem da notícia
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: news.imageUrl }} style={styles.newsImage} />
      <View style={styles.newsContent}>
        <Text style={styles.newsTitulo}>{news.titulo}</Text>
        <Text style={styles.newsText}>{news.content}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Serviço</Text>
        <Text style={styles.footerText}>Jornal Cândido</Text>
        <Text style={styles.footerText}>
          Publicação de literatura editada desde 2011
        </Text>
        <Text style={styles.footerText}>
          Leia ou baixe no site candido.bpp.pr.gov.br
        </Text>
        <Text style={styles.footerText}>@candidobpp</Text>
        <Text style={styles.footerText}></Text>
        <Text style={styles.footerText}>
          Biblioteca Pública do Paraná (BPP)
        </Text>
        <Text style={styles.footerText}>Cândido Lopes, 133 - Centro</Text>
        <Text style={styles.footerText}>Curitiba - PR</Text>
        <Text style={styles.footerText}>41 3221-4900</Text>
        <Text style={styles.footerText}>@bibliotecapr</Text>
        <Text style={styles.footerText}></Text>
        <Text style={styles.footerText}>Horário de Atendimento</Text>
        <Text style={styles.footerText}>
          Segunda a sexta-feira, das 8h30 às 20h
        </Text>
        <Text style={styles.footerText}>Sábados, das 8h30 às 13h</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  newsImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  newsContent: {
    padding: 20,
  },
  newsTitulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2c3e50",
  },
  newsText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  footer: {
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  footerText: {
    fontSize: 14,
    color: "#777",
    marginBottom: 10,
  },
});
