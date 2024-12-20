import Card from "@/components/Card";
import { FlatList, RefreshControl, useColorScheme, View } from "react-native";
import Title from "@/components/Title";
import Paragraph from "@/components/Paragraph";
import { Container } from "../styles/homeStyle";
import { DarkTheme, DefaultTheme } from "@/constants/Colors";
import FloatingButton from "@/components/FloatingButton";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { api, handleRequestError } from "@/api";
import { AuthContext } from "@/context/auth";
import EmptyList from "@/components/EmptyList";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, cleanFavorites } from "@/redux/ducks/favorites";
import { fetchBeveragesRequest } from "@/redux/ducks/beverages";

export default function HomeScreen() {
  const colorScheme = useColorScheme()
  const navigation = useNavigation<any>()
  const dispatch = useDispatch()
  const beverages = useSelector((state: any) => state.beverages)
  
  const [refreshing, setRefreshing] = useState(false);

  const {
    user,
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
      // do saga actions to delete
    } catch(error) {
      handleRequestError(error)
    }
  }
  
  const getBeverages = async () => {
    dispatch(cleanFavorites())

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    dispatch(fetchBeveragesRequest({ userId: user?.id!! }))
  }

  useEffect(() => {
    onRefresh()
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getBeverages()
    setTimeout(() => {
      beverages.forEach((beverage: Beverage) => {
        if(beverage.rating === 5) {
          dispatch(addFavorite(beverage))
        }
      })
      setRefreshing(false);
    }, 2000);
  }, []);

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
        data={beverages}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={refreshing ? null : <EmptyList />}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListFooterComponent={() => <View style={{ height: 88 }} />}
        keyExtractor={() => Math.random().toString()}
        key={Math.random().toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
      <FloatingButton iconName='plus' onPress={() => {
        navigation.navigate('beverage')
      }} type="primary"/>
    </Container>
  );
}
