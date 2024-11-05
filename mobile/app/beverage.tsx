import React, { useContext, useState } from 'react'
import { ButtonContainer, Container, TextContainer } from './styles/beverage'
import Title from '@/components/Title'
import { Image, Platform, TouchableOpacity, View } from 'react-native'
import Background from '@/assets/images/background.png'
import Button from '@/components/Button'
import { useTheme } from '@react-navigation/native'
import Input from '@/components/Input'
import { useNavigation } from 'expo-router'
import { data, Selector } from '@/components/Selector'
import Rating from '@/components/Rating'
import { IndexPath } from '@ui-kitten/components'
import { Feather } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { api, handleRequestError } from '@/api'
import { AuthContext } from '@/context/auth'

export default function ProductDetailScreen() {
  const theme = useTheme()
  const [image, setImage] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [rating, setRating] = useState<number>(0)
  const [type, setType] = useState<IndexPath>(new IndexPath(0))

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      const formData = new FormData();

      const image = result.assets[0]
      
      // @ts-ignore
      formData.append('file', {
        type: 'image/jpeg',
        name: "beverage.jpg",
        uri: image.uri,
      });

      try {
        const response = await api.post('/beverages/image', formData, {
          headers: {
            "Accept": "application/json",
            "Content-Type": "multipart/form-data"
          }
        });
        setImage(response.data.url)
      } catch(error) {
        handleRequestError(error)
      }
    }
  };

  const navigation = useNavigation<any>()

  const {
    user
  } = useContext(AuthContext);


  const onSaveProduct = async () => {
    try {
      await api.post('/beverages', {
        createdAt: new Date().toISOString(),
        description: description,
        name: name,
        rating: rating,
        type: data[type.row],
        userId: user?.id || 0,
        image: image
      })

      clearFields()
      navigation.navigate('(tabs)')
    } catch(error) {
      handleRequestError(error)
    }
  }

  const clearFields = () => {
    setName("")
    setDescription("")
    setRating(0)
    setType(new IndexPath(0))
  }

  return (
    <Container>
      {image.length > 0 ? (
        <Image source={{ uri: image }} resizeMode="cover" style={{
          width: "100%",
          height: "50%"
        }}/>
      ) : (
        <Image source={Background} resizeMode="cover" style={{
          width: "100%",
          height: "50%"
        }}/>
      )}
      <TouchableOpacity style={{
        backgroundColor: theme.colors.primary,
        marginTop: -28,
        alignSelf: 'flex-end',
        marginRight: 16,
        padding: 12,
        borderRadius: 28
      }} onPress={() => {
        pickImage()
      }}>
        <Feather name='upload' size={32} color={theme.colors.card} />
      </TouchableOpacity>
      <TextContainer>
        <Title content='Avaliação' style={{ marginTop: 24, marginBottom: 8, fontSize: 32 }}/>
        <Input label="Nome da Bebida" value={name} onChangeText={setName}></Input>
        <Input 
        label="Descrição" 
        value={description} 
        onChangeText={setDescription}
        multiline
        numberOfLines={6}
        ></Input>
        <Selector selectedIndex={type} setSelectedIndex={setType}/>
        <Rating rating={rating} setRating={setRating}/>
        <ButtonContainer>
          <Button content="voltar" type='white'  style={{ width: "49%" }} onPress={() => {
            navigation.navigate("home")
          }} />
          <View  style={{ width: "2%" }}/>
          <Button content="cadastrar" type='primary' style={{ width: "49%" }} onPress={() => onSaveProduct()} />
        </ButtonContainer>
      </TextContainer>
    </Container>
  )
}