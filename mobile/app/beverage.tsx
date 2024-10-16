import React, { useState } from 'react'
import { ButtonContainer, Container, TextContainer } from './styles/beverage'
import Title from '@/components/Title'
import { Image, View } from 'react-native'
import Background from '@/assets/images/background.png'
import Button from '@/components/Button'
import { useTheme } from '@react-navigation/native'
import Input from '@/components/Input'
import { useNavigation } from 'expo-router'
import { Selector } from '@/components/Selector'
import Rating from '@/components/Rating'
import Spacer from '@/components/Spacer'
import { IndexPath } from '@ui-kitten/components'

interface IProductDetailScreen {
  onSaveProduct: React.Dispatch<React.SetStateAction<any>>
}

export default function ProductDetailScreen({onSaveProduct}: IProductDetailScreen) {
  const theme = useTheme()
  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [rating, setRating] = useState<number>(0)
  const [type, setType] = useState<IndexPath>(new IndexPath(0))

  const navigation = useNavigation<any>()

  return (
    <Container>
      <Image source={Background} resizeMode="cover" style={{
        width: "100%",
      }}/>
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
          <Button content="cadastrar" type='primary' style={{ width: "49%" }} onPress={() => onSaveProduct({
            name,
            description,
            type,
            rating
          })} />
        </ButtonContainer>
      </TextContainer>
    </Container>
  )
}