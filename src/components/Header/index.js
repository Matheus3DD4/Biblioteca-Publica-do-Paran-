import React from "react-native";
import { View, Text, StyleSheet, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <AntDesign name="bars" size={30} color={"white"} />
        </View>
        <Text style={styles.titulo}> Biblioteca Pública Paraná </Text>
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: "https://media.glassdoor.com/sql/2493747/biblioteca-p%C3%BAblica-do-paran%C3%A1-squarelogo-1555303572425.png",
            }}
            style={styles.logo}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#007b8b",
    paddingBottom: 10,
    paddingTop: 40,
  },
  header: {
    backgroundColor: "#007b8b",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
    marginStart: 10,
    marginEnd: 10,
    justifyContent: "space-between",
    paddingBottom: 10,
    paddingTop: 10,
  },
  iconContainer: {
    flexDirection: "row",
    marginEnd: 10,
    justifyContent: "flex-start",
  },
  titulo: {
    flex: 1,
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  logoContainer: {
    width: 30,
    height: 30,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    marginStart: 10,
  },
});
