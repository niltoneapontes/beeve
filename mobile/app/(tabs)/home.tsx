import Card from "@/components/Card";
import { FlatList, useColorScheme, View } from "react-native";
import Title from "@/components/Title";
import Paragraph from "@/components/Paragraph";
import { Container } from "../styles/homeStyle";
import { DarkTheme, DefaultTheme } from "@/constants/Colors";
import FloatingButton from "@/components/FloatingButton";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { api, handleRequestError } from "@/api";
import { AuthContext } from "@/context/auth";
import EmptyList from "@/components/EmptyList";

export interface Beverage {
  image: string;
  name: string;
  description: string;
  rating: number;
}

export default function HomeScreen() {
  const colorScheme = useColorScheme()
  const navigation = useNavigation<any>()

  const [data, setData] = useState<Beverage[]>([] as Beverage[])
  const {
    user
  } = useContext(AuthContext);
  
  useEffect(() => {
    const getBeverages = async () => {
      try {
        const response = await api.get('/beverages', {
          params: {
            userId: user?.id || 0
          }
        })
        setData(response.data)
      } catch(error) {
        handleRequestError(error)
      }
    }

    getBeverages()
  }, [])

  return (
    <Container>
      <Title content="Suas bebidas" />
      <Paragraph content="Cadastre aqui cafés,chás, cervejas, refrigerantes ou qualquer outra bebida que deseje avaliar." style={{ marginVertical: 8 }}/>
      <FlatList
        style={{
          width: "100%",
          marginTop: 16,
          backgroundColor: colorScheme === 'dark' ? DarkTheme.backgroundColor : DefaultTheme.backgroundColor
        }}
        data={data}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyList />}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListFooterComponent={() => <View style={{ height: 88 }} />}
        keyExtractor={() => Math.random().toString()}
        key={Math.random().toString()}
        renderItem={({item}) => (
          <Card 
          key={Math.random().toString()} 
          image={item.image} 
          title={item.name} 
          subtitle={item.description} 
          rate={item.rating} 
          onPress={() => {
            navigation.navigate("beverage", {})
          }} />
        )}
      />
      <FloatingButton iconName='plus' onPress={() => {
        navigation.navigate('beverage')
      }} type="primary"/>
    </Container>
  );
}
