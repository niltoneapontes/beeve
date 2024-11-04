import React, { useContext, useState } from 'react'
import { ButtonContainer, Container, TextContainer } from './styles/loginStyle'
import Title from '@/components/Title'
import { Image, View } from 'react-native'
import Background from '@/assets/images/background.png'
import Paragraph from '@/components/Paragraph'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { useNavigation } from 'expo-router'
import { api, handleRequestError } from '@/api'
import axios from 'axios'
import { AuthContext } from '@/context/auth'

export default function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigation = useNavigation<any>()

  const {
    setUser
  } = useContext(AuthContext);

  const onSignin = async () => {
    try {
      const response = await api.post('/users/login', {
        email: email,
        password: password
      })

      const loggedUser = response.data

      setEmail("")
      setPassword("")

      if(setUser) {
        setUser(loggedUser)
      }
      navigation.navigate('(tabs)')
    } catch(error) {
      handleRequestError(error)
    }
  }

  return (
    <Container>
      <Image source={Background} resizeMode="cover" style={{
        width: "100%",
        height: "50%"
      }}/>
      <TextContainer>
        <Title content='Esse é o Beeve!' style={{ marginTop: 24, marginBottom: 8, fontSize: 32 }}/>
        <Paragraph content="Descubra, avalie e compartilhe suas experiências com bebidas." />
        <View style={{ height: 8 }}></View>
        <Input label="E-mail" value={email} onChangeText={setEmail} autoCapitalize='none' textContentType='emailAddress'></Input>
        <Input label="Password" value={password} onChangeText={setPassword} textContentType='password' secureTextEntry></Input>
        <ButtonContainer>
          <Button content="login" type='primary' style={{ width: "100%" }} onPress={() => onSignin()} />
          <Button content="cadastro" type='white' style={{ width: "100%", marginTop: 8}} onPress={() => {
            navigation.navigate('signup')
          }} />
        </ButtonContainer>
      </TextContainer>
    </Container>
  )
}