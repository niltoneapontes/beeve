import Card from "@/components/Card";
import { Dimensions, FlatList, RefreshControl, TouchableOpacity, useColorScheme, View } from "react-native";
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
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { useTheme } from "styled-components/native";
import { Feather } from "@expo/vector-icons";

export interface Beverage {
  id?: number;
  image: string;
  name: string;
  description: string;
  type: string;
  rating: number;
}

export default function HomeScreen() {
  const colorScheme = useColorScheme()
  const navigation = useNavigation<any>()

  const [data, setData] = useState<Beverage[]>([] as Beverage[])
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
      const newBeverageList = data.filter(item => item.id != beverage.id)
      setData(newBeverageList)
    } catch(error) {
      handleRequestError(error)
    }
  }
  
  const getBeverages = async () => {
    try {
      const response = await api.get('/beverages', {
        params: {
          userId: user?.id || 0
        },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setData(response.data)
    } catch(error) {
      handleRequestError(error)
    }
  }

  useEffect(() => {
    setRefreshing(true)
    setTimeout(() => {
      getBeverages()
      setRefreshing(false)
    }, 2000)
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getBeverages()
    setTimeout(() => {
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
        data={data}
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
