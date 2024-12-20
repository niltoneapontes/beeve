import Card from "@/components/Card";
import { FlatList, useColorScheme, View } from "react-native";
import Title from "@/components/Title";
import Paragraph from "@/components/Paragraph";
import { Container } from "../styles/homeStyle";
import { DarkTheme, DefaultTheme } from "@/constants/Colors";
import { useContext, useEffect } from "react";
import { useNavigation } from "expo-router";
import { api, handleRequestError } from "@/api";
import { AuthContext } from "@/context/auth";
import EmptyList from "@/components/EmptyList";
import { useDispatch, useSelector } from "react-redux";
import { FavoritesState, removeFavorite } from "@/redux/ducks/favorites";

export default function FavoritesScreen() {
  const colorScheme = useColorScheme()
  const navigation = useNavigation<any>()
  const beverages = useSelector((state: FavoritesState) => state.beverages)
  const dispatch = useDispatch()

  const {
    token
  } = useContext(AuthContext);

  const deleteBeverages = async (beverage: Beverage) => {
    try {
      await api.delete('/beverages', {
        params: {
          id: beverage.id
        },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      dispatch(removeFavorite({ id: beverage.id }))
    } catch(error) {
      handleRequestError(error)
    }
  }

  useEffect(() => {
    console.log(beverages)
  }, [beverages])

  return (
    <Container>
      <Title content="Favoritas" />
      <Paragraph content="Confira as bebidas que você avaliou com 5 estrelas." style={{ marginVertical: 8 }}/>
      <FlatList
        style={{
          width: "100%",
          marginTop: 16,
          backgroundColor: colorScheme === 'dark' ? DarkTheme.backgroundColor : DefaultTheme.backgroundColor
        }}
        data={beverages}
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
                subtitle={item.type} 
                rate={item.rating} 
                onPress={() => {
                  navigation.navigate("beverage" as never, {
                    beverage: item
                  } as never)
                }}
                onDelete={() => {
                  deleteBeverages(item)
                }} />
        )}
      />
    </Container>
  );
}
