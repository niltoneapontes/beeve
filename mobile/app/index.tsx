import React, { useState } from 'react'
import { ButtonContainer, Container, TextContainer } from './styles/loginStyle'
import Title from '@/components/Title'
import { Image, View } from 'react-native'
import Background from '@/assets/images/background.png'
import Paragraph from '@/components/Paragraph'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { useNavigation } from 'expo-router'

export default function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigation = useNavigation<any>()

  return (
    <Container>
      <Image source={Background} resizeMode="cover" style={{
        width: "100%",
      }}/>
      <TextContainer>
        <Title content='Esse é o Beeve!' style={{ marginTop: 24, marginBottom: 8, fontSize: 32 }}/>
        <Paragraph content="Descubra, avalie e compartilhe suas experiências com bebidas." />
        <View style={{ height: 8 }}></View>
        <Input label="E-mail" value={email} onChangeText={setEmail} autoCapitalize='none'></Input>
        <Input label="Password" value={password} onChangeText={setPassword}></Input>
        <ButtonContainer>
          <Button content="login" type='primary' style={{ width: "100%" }} onPress={() => 
            {
              if(email.toLocaleLowerCase() === "niltoneapontes@gmail.com" && password === "123456") {
                navigation.navigate("(tabs)")
              }
            }
          } />
          <Button content="cadastro" type='white' style={{ width: "100%" }} onPress={() => {
            navigation.navigate('cadastro')
          }} />
        </ButtonContainer>
      </TextContainer>
    </Container>
  )
}