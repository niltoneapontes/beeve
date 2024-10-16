import React, { useState } from 'react'
import { ButtonContainer, Container, TextContainer } from './styles/loginStyle'
import Title from '@/components/Title'
import { Image, View } from 'react-native'
import Background from '@/assets/images/background.png'
import Paragraph from '@/components/Paragraph'
import Button from '@/components/Button'
import { useTheme } from '@react-navigation/native'
import Input from '@/components/Input'
import { IUser } from './_layout'
import { useNavigation } from 'expo-router'

interface ILoginScreen {
  onLogin: React.Dispatch<React.SetStateAction<IUser>>
}

export default function LoginScreen({onLogin}: ILoginScreen) {
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
        <Input label="E-mail" value={email} onChange={setEmail}></Input>
        <Input label="Password" value={password} onChange={setPassword}></Input>
        <ButtonContainer>
          <Button content="login" type='primary' style={{ width: "100%" }} onPress={() => onLogin({
            email,
            password
          })} />
          <Button content="cadastro" type='white' style={{ width: "100%" }} onPress={() => {
            navigation.navigate('cadastro')
          }} />
        </ButtonContainer>
      </TextContainer>
    </Container>
  )
}