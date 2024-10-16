import Card from "@/components/Card";
import { FlatList, useColorScheme, View } from "react-native";
import Background from '@/assets/images/background.png'
import Title from "@/components/Title";
import Paragraph from "@/components/Paragraph";
import { Container } from "../styles/homeStyle";
import { DarkTheme, DefaultTheme } from "@/constants/Colors";
import FloatingButton from "@/components/FloatingButton";
import { useState } from "react";
import { useNavigation } from "expo-router";

export default function HomeScreen() {
  const colorScheme = useColorScheme()
  const navigation = useNavigation<any>()

  const [data, setData] = useState([
    {
      image: Background,
      title: "Heineken",
      subtitle: "Descrição",
      rate: 4,
    },
    {
      image: Background,
      title: "Chá de Camomila",
      subtitle: "Descrição",
      rate: 2,
    },
    {
      image: Background,
      title: "Café 3 Corações",
      subtitle: "Descrição",
      rate: 5,
    }
  ])

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
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListFooterComponent={() => <View style={{ height: 88 }} />}
        keyExtractor={() => Math.random().toString()}
        key={Math.random().toString()}
        renderItem={({item}) => (
          <Card 
          key={Math.random().toString()} 
          image={item.image} 
          title={item.title} 
          subtitle={item.subtitle} 
          rate={item.rate} 
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
