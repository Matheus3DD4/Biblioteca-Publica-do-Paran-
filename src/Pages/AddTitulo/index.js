import { useEffect, useState, useCallback } from 'react';
import { Card, Text, FAB } from 'react-native-paper';
import { RefreshControl, StyleSheet, ScrollView, View } from 'react-native';
import TituloService from '../../services/titulos';


export default function MovieList({ navigation }) {
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

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {titulos.map((titulo) => (
          <Card style={styles.card} key={titulo.id}>
            <Card.Content>
              <Text variant="titleLarge">{titulo.titulo}</Text>
              <Text variant="bodyMedium">
                {titulo.categoria.descricao} - {titulo.autor.nome}
              </Text>
            </Card.Content>
            <Card.Cover
              style={styles.cover}
              source={{ uri: titulo.capa.file }}
            />
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    margin: 10,
  },
  cover: {
    height: 400,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});