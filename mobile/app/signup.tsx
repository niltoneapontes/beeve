import React, { useContext, useState } from 'react'
import { ButtonContainer, Container, TextContainer } from './styles/signupStyle'
import Title from '@/components/Title'
import { Image, Text, View } from 'react-native'
import Background from '@/assets/images/background.png'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { useNavigation } from 'expo-router'
import { api, handleRequestError } from '@/api'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { IUser } from './_layout'
import { useRoute } from '@react-navigation/native'
import { AuthContext } from '@/context/auth'


export default function SignupScreen() {
  const { user, token, login } = useContext(AuthContext)

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('O e-mail é obrigatório'),
    password: Yup.string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .required('A senha é obrigatória'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password')], 'As senhas devem conferir')
      .required('Por favor confirme a senha'),
    name: Yup.string().required('Não deixe o nome em branco'),
    username: Yup.string().required('Não deixe o nome em branco'),
    birthdate: Yup.string().required('Data de nascimento é necessária')
  });

  const navigation = useNavigation<any>()

  const onSignup = async ({    
    birthdate,
    email,
    name,
    password,
    socialAccountId,
    socialAccountProvider,
    username
  }: IUser) => {
    try {
      if(user) {
        const response = await api.put('/users', {
          id: user.id,
          birthdate: birthdate,
          createdAt: new Date().toISOString(),
          email: email,
          name: name,
          password: password,
          socialAccountId: socialAccountId,
          socialAccountProvider: socialAccountProvider,
          username: username
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        login(response.data, response.data.access_token)
      } else {
        await api.post('/users', {
          birthdate: birthdate,
          createdAt: new Date().toISOString(),
          email: email,
          name: name,
          password: password,
          socialAccountId: socialAccountId,
          socialAccountProvider: socialAccountProvider,
          username: username
        })
      }

      navigation.navigate('(tabs)')
    } catch(error) {
      handleRequestError(error)
    }
  }

  return (
    <Container contentContainerStyle={{
      alignItems: 'flex-start',
      justifyContent: 'flex-end'
    }}>
      <Formik initialValues={{        
        birthdate: user?.birthdate || '',
        email: user?.email || '',
        name: user?.name || '',
        password: '',
        passwordConfirmation: '',
        socialAccountId: user?.socialAccountId || null,
        socialAccountProvider: user?.socialAccountProvider || null,
        username: user?.username || '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSignup(values as unknown as IUser)
      }}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <>
        <Image source={Background} resizeMode="cover" style={{
          width: "100%",
          height: 320
        }}/>
        <TextContainer>
          <Title content='Cadastro' style={{ marginTop: 24, marginBottom: 8, fontSize: 32 }}/>
          
          <Input label="Nome Completo" value={values.name} onChangeText={handleChange('name')} onBlur={handleBlur('name')}></Input>
          {errors.name && touched.name && <Text style={{ color: 'red', marginTop: -4, marginLeft: 2}}>{errors.name}</Text>}
          
          <Input label="E-mail" value={values.email} onChangeText={handleChange('email')} onBlur={handleBlur('email')} textContentType='emailAddress'></Input>
          {errors.email && touched.email && <Text style={{ color: 'red', marginTop: -4, marginLeft: 2 }}>{errors.email}</Text>}
          
          <Input label="Username" value={values.username} onChangeText={handleChange('username')} onBlur={handleBlur('username')}></Input>
          {errors.username && touched.username && <Text style={{ color: 'red', marginTop: -4, marginLeft: 2 }}>{errors.username}</Text>}
          
          <Input label="Data de Nascimento" value={values.birthdate} onChangeText={handleChange('birthdate')} onBlur={handleBlur('name')} textContentType='birthdateDay'></Input>
          {errors.birthdate && touched.birthdate && <Text style={{ color: 'red', marginTop: -4, marginLeft: 2 }}>{errors.birthdate}</Text>}
          
          <Input label="Senha" value={values.password} onChangeText={handleChange('password')} onBlur={handleBlur('password')} textContentType='password' secureTextEntry></Input>
          {errors.password && touched.password && <Text style={{ color: 'red', marginTop: -4, marginLeft: 2 }}>{errors.password}</Text>}
          
          <Input label="Confirmação da Senha" value={values.passwordConfirmation} onChangeText={handleChange('passwordConfirmation')}  textContentType='password' secureTextEntry></Input>
          {errors.passwordConfirmation && touched.passwordConfirmation && <Text style={{ color: 'red', marginTop: -4, marginLeft: 2 }}>{errors.passwordConfirmation}</Text>}
          
          <ButtonContainer>
            <Button content="voltar" type='white'  style={{ width: "49%" }} onPress={() => {
              navigation.goBack()
            }} />
            <View  style={{ width: "2%" }}/>
            <Button content="cadastrar" type='primary' style={{ width: "49%" }} onPress={handleSubmit} />
          </ButtonContainer>
        </TextContainer>
        </>
        )}
      </Formik>
    </Container>
  )
}