import { FlatList, RefreshControl, Text, View } from 'react-native';
import { Container } from '../styles/searchStyle';
import Title from '@/components/Title';
import Paragraph from '@/components/Paragraph';
import Card from '@/components/Card';
import FloatingButton from '@/components/FloatingButton';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useNavigation } from 'expo-router';
import { useCallback, useContext, useEffect, useState } from 'react';
import { DarkTheme, DefaultTheme } from '@/constants/Colors';
import BeeveSearchBar from '@/components/SearchBar';
import { AuthContext } from '@/context/auth';
import { api, handleRequestError } from '@/api';
import EmptyList from '@/components/EmptyList';

export default function TabTwoScreen() {
  const colorScheme = useColorScheme()
  const navigation = useNavigation<any>()

  const [data, setData] = useState<Beverage[]>([] as Beverage[])
  const [refreshing, setRefreshing] = useState(false);

  const {
    user,
    token
  } = useContext(AuthContext);
  
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
    getBeverages()
  }, [])

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

  const filterBeverages = async (search: string) => {
    try {
      const response = await api.get('/beverages', {
        params: {
          userId: user?.id || 0
        },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const filteredBeverages = response.data.filter((beverage: Beverage) => beverage.name.toLowerCase().includes(search.toLowerCase()))
      setData(filteredBeverages)
    } catch(error) {
      handleRequestError(error)
    }
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getBeverages()
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <Container>
      <Title content="Pesquisa" />
      <Paragraph content="Encontre aqui uma de suas avaliações" style={{ marginVertical: 8 }}/>
      <BeeveSearchBar onSearch={filterBeverages}/>
      <FlatList
        style={{
          width: "100%",
          marginTop: 16,
          backgroundColor: colorScheme === 'dark' ? DarkTheme.backgroundColor : DefaultTheme.backgroundColor
        }}
        data={data}
        ListEmptyComponent={<EmptyList />}
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
            navigation.navigate("beverage", {})
          }}
          onDelete={() => {
            deleteBeverages(item)
          }}
           />
        )}
      />
      <FloatingButton iconName='plus' onPress={() => {
        navigation.navigate('beverage')
      }} type="primary"/>
    </Container>
  );
}
