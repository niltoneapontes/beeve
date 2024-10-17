import { FlatList, Text, View } from 'react-native';
import { Container } from '../styles/searchStyle';
import Title from '@/components/Title';
import Paragraph from '@/components/Paragraph';
import Card from '@/components/Card';
import FloatingButton from '@/components/FloatingButton';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useNavigation } from 'expo-router';
import { useState } from 'react';
import Background from '@/assets/images/background.png'
import { DarkTheme, DefaultTheme } from '@/constants/Colors';
import BeeveSearchBar from '@/components/SearchBar';

export default function TabTwoScreen() {
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
      <Title content="Pesquisa" />
      <Paragraph content="Encontre aqui uma de suas avaliações" style={{ marginVertical: 8 }}/>
      <BeeveSearchBar />
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
