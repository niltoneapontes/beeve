import { TouchableOpacity, View } from 'react-native';
import { Container, Header, PictureContainer, ProfileImage } from '../styles/profileStyle';
import Title from '@/components/Title';
import Paragraph from '@/components/Paragraph';
import Button from '@/components/Button';
import { DarkTheme } from '@/constants/Colors';
import Avatar1 from '@/assets/images/avatars/1.png'
import Avatar2 from '@/assets/images/avatars/2.png'
import Avatar3 from '@/assets/images/avatars/3.png'
import Avatar4 from '@/assets/images/avatars/4.png'
import Spacer from '@/components/Spacer';
import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/auth';
import PickImage from '@/components/PickImage';
import LocalStorage from '@/utilities/localstorage';
import { Modal } from 'react-native-paper';
import { useNavigation } from 'expo-router';
import Toast from 'react-native-toast-message';
import { showToast } from '@/utilities/toast';

export default function TabThreeScreen() {
  const [showModal, setShowModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("1");

  const {
    user
  } = useContext(AuthContext);

  const navigation = useNavigation<any>()

  const birthYear = user?.birthdate.split("/")[2] || '2000'
  const age = new Date().getFullYear() - parseInt(birthYear)

  useEffect(() => {
    const getAvatar = async() => {
      try {
        const value = await LocalStorage.getData("@eeve/avatar")
        if(value) {
          setSelectedAvatar(value)
        }
      } catch(error) {
        showToast('error', 'Oops...', 'Não foi possível buscar seu avatar :(')
      }
    }

    getAvatar()
  }, [])

  const setAvatar = async(avatar: string) => {
    try {
      setSelectedAvatar(avatar)
      await LocalStorage.storeData("@eeve/avatar", avatar)
    } catch(error) {
      showToast('error', 'Oops...', "Não foi possível salvar seu avatar :(")
    }
  }

  const avatar = useCallback(() => {
    switch(selectedAvatar) {
      case "1": 
        return Avatar1
      case "2": 
        return Avatar2
      case "3": 
        return Avatar3
      case "4": 
        return Avatar4
      default: 
        return Avatar1
    }
  }, [selectedAvatar])

  return (
    <>
      <Header></Header>
      <Container>
        <PictureContainer>
            <ProfileImage 
            source={avatar()}
            key={selectedAvatar}
            style={{ 
              alignSelf: 'center',
              width: 160, 
              height: 160,
              marginTop: -80,
              backgroundColor: DarkTheme.secondary,
              borderRadius: 80 }} />
          <PickImage onPickImage={() => {
            setShowModal(true)
          }} iconName='edit-2'></PickImage>
        </PictureContainer>
        <Title content={user?.name || "Sem nome"} style={{ marginTop: 40, marginBottom: 32, fontSize: 32 }} />
        <Paragraph content={`@${user?.username || "Sem username"}`}/>
        <Paragraph content={user?.email || "Sem e-mail"} />
        <Paragraph content={`${age} anos` || "-"} />
        <Spacer />
        <Button content="editar" type="primary" onPress={() => {
          navigation.navigate("signup")
        }}  style={{ marginTop: 40, marginBottom: 32, height: 56, width: '100%' }}/>
      </Container>
      <Modal visible={showModal}  onDismiss={() => setShowModal(false)} contentContainerStyle={{
        backgroundColor: 'white',
        padding: 20,
        margin: 20, 
        alignItems: 'center',
        justifyContent: 'center',
        height: 320,
        borderRadius: 8
      }}>
          <View style={{ flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => {
              setAvatar("1")
              setShowModal(false)
            }}>
              <ProfileImage 
              source={Avatar1}
              style={{ 
                alignSelf: 'center',
                width: 120, 
                height: 120,
                backgroundColor: DarkTheme.secondary,
                borderRadius: 60, 
                marginRight: 32 }} />
                </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setAvatar("2")
              setShowModal(false)
            }}>
              <ProfileImage 
              source={Avatar2}
              style={{ 
                alignSelf: 'center',
                width: 120, 
                height: 120,
                backgroundColor: DarkTheme.secondary,
                borderRadius: 60
                }} />
                </TouchableOpacity>
          </View>
          <View style={{ flex:1, flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => {
              setAvatar("3")
              setShowModal(false)
            }}>
              <ProfileImage 
              source={Avatar3}
              style={{ 
                alignSelf: 'center',
                width: 120, 
                height: 120,
                backgroundColor: DarkTheme.secondary,
                borderRadius: 60, 
                marginRight: 32}} />
                </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setAvatar("4")
              setShowModal(false)
            }}>
              <ProfileImage 
              source={Avatar4}
              style={{ 
                alignSelf: 'center',
                width: 120, 
                height: 120,
                backgroundColor: DarkTheme.secondary,
                borderRadius: 60
                }} />
                </TouchableOpacity>
          </View>
      </Modal>
    </>
  );
}

