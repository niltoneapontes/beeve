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
import { api, handleRequestError } from '@/api'
import axios from 'axios'

export default function SignupScreen() {
  const theme = useTheme()
  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [birthdate, setBirthdate] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  const navigation = useNavigation<any>()

  const onSignup = async () => {
    if(password != passwordConfirmation) {
      return
    }

    try {
      await api.post('/users', {
        birthdate: birthdate,
        createdAt: new Date().toISOString(),
        email: email,
        name: fullname,
        password: password,
        socialAccountId: null,
        socialAccountProvider: null,
        username: username
      })

      navigation.navigate('(tabs)')
    } catch(error) {
      handleRequestError(error)
    }
  }

  const clearFields = () => {
    setFullname("")
    setEmail("")
    setUsername("")
    setBirthdate("")
    setPassword("")
    setPasswordConfirmation("")
  }

  return (
    <Container>
      <Image source={Background} resizeMode="cover" style={{
        width: "100%",
      }}/>
      <TextContainer>
        <Title content='Cadastro' style={{ marginTop: 24, marginBottom: 8, fontSize: 32 }}/>
        <Input label="Nome Completo" value={fullname} onChangeText={setFullname}></Input>
        <Input label="E-mail" value={email} onChangeText={setEmail} textContentType='emailAddress'></Input>
        <Input label="Username" value={username} onChangeText={setUsername}></Input>
        <Input label="Data de Nascimento" value={birthdate} onChangeText={setBirthdate} textContentType='birthdateDay'></Input>
        <Input label="Senha" value={password} onChangeText={setPassword} textContentType='password' secureTextEntry></Input>
        <Input label="Confirmação da Senha" value={passwordConfirmation} onChangeText={setPasswordConfirmation} textContentType='password' secureTextEntry></Input>
        <ButtonContainer>
          <Button content="voltar" type='white'  style={{ width: "49%" }} onPress={() => {
            navigation.navigate("index")
          }} />
          <View  style={{ width: "2%" }}/>
          <Button content="cadastrar" type='primary' style={{ width: "49%" }} onPress={() => onSignup()} />
        </ButtonContainer>
      </TextContainer>
    </Container>
  )
}