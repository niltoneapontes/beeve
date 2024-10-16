import React, { useState } from 'react'
import { ButtonContainer, Container, TextContainer } from './styles/signupStyle'
import Title from '@/components/Title'
import { Image, View } from 'react-native'
import Background from '@/assets/images/background.png'
import Paragraph from '@/components/Paragraph'
import Button from '@/components/Button'
import { useTheme } from '@react-navigation/native'
import { TextInput } from 'react-native-paper'
import { DarkTheme } from '@/constants/Colors'
import Input from '@/components/Input'
import { IUser } from './_layout'
import { useNavigation } from 'expo-router'

interface ISignupScreen {
  onSignup: React.Dispatch<React.SetStateAction<IUser>>
}

export default function SignupScreen({onSignup}: ISignupScreen) {
  const theme = useTheme()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigation = useNavigation<any>()

  return (
    <Container>
      <Image source={Background} resizeMode="cover" style={{
        width: "100%",
      }}/>
      <TextContainer>
        <Title content='Cadastro' style={{ marginTop: 24, marginBottom: 8, fontSize: 32 }}/>
        <Input label="Nome Completo" value={email} onChangeText={setEmail}></Input>
        <Input label="E-mail" value={email} onChangeText={setEmail}></Input>
        <Input label="Username" value={email} onChangeText={setEmail}></Input>
        <Input label="Data de Nascimento" value={email} onChangeText={setEmail}></Input>
        <Input label="Senha" value={password} onChangeText={setPassword}></Input>
        <Input label="Confirmação da Senha" value={password} onChangeText={setPassword}></Input>
        <ButtonContainer>
          <Button content="voltar" type='white'  style={{ width: "49%" }} onPress={() => {
            navigation.navigate("index")
          }} />
          <View  style={{ width: "2%" }}/>
          <Button content="cadastrar" type='primary' style={{ width: "49%" }} onPress={() => onSignup({
            email,
            password
          })} />
        </ButtonContainer>
      </TextContainer>
    </Container>
  )
}