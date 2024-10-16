import React, { useState } from 'react'
import { ButtonContainer, Container, TextContainer } from './styles/cadastroStyle'
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

interface ICadastroScreen {
  onCadastro: React.Dispatch<React.SetStateAction<IUser>>
}

export default function CadastroScreen({onCadastro}: ICadastroScreen) {
  const theme = useTheme()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <Container>
      <Image source={Background} resizeMode="cover" style={{
        width: "100%",
      }}/>
      <TextContainer>
        <Title content='Cadastro' style={{ marginTop: 24, marginBottom: 8, fontSize: 32 }}/>
        <View style={{ height: 8 }}></View>
        <Input label="Nome Completo" value={email} onChange={setEmail}></Input>
        <Input label="E-mail" value={email} onChange={setEmail}></Input>
        <Input label="Username" value={email} onChange={setEmail}></Input>
        <Input label="Data de Nascimento" value={email} onChange={setEmail}></Input>
        <Input label="Senha" value={password} onChange={setPassword}></Input>
        <Input label="Confirmação da Senha" value={password} onChange={setPassword}></Input>
        <ButtonContainer>
          <Button content="voltar" type='white' onPress={() => {}} />
          <View style={{ width: 8 }}/>
          <Button content="cadastrar" type='primary' onPress={() => onCadastro({
            email,
            password
          })} />
        </ButtonContainer>
      </TextContainer>
    </Container>
  )
}