import { Text, View } from 'react-native';
import { Container, Header, ProfileImage } from '../styles/profileStyle';
import Title from '@/components/Title';
import Paragraph from '@/components/Paragraph';
import Button from '@/components/Button';
import { DarkTheme } from '@/constants/Colors';
import Background from '@/assets/images/background.png'
import Spacer from '@/components/Spacer';
import { useContext } from 'react';
import { AuthContext } from '@/context/auth';

export default function TabThreeScreen() {
  const {
    user
  } = useContext(AuthContext);

  const birthYear = user?.birthdate.split("/")[2] || '2000'
  const age = new Date().getFullYear() - parseInt(birthYear)

  return (
    <>
      <Header></Header>
      <Container>
        <ProfileImage 
        source={Background}
        style={{ 
          alignSelf: 'center',
          width: 160, 
          height: 160,
          marginTop: -80,
          backgroundColor: DarkTheme.secondary,
          borderRadius: 80 }} />
        <Title content={user?.name || "Sem nome"} style={{ marginTop: 40, marginBottom: 32, fontSize: 32 }} />
        <Paragraph content={`@${user?.username || "Sem username"}`}/>
        <Paragraph content={user?.email || "Sem e-mail"} />
        <Paragraph content={`${age} anos` || "-"} />
        <Spacer />
        <Button content="editar" type="primary" onPress={() => {}}  style={{ marginTop: 40, marginBottom: 32, height: 56, width: '100%' }}/>
      </Container>
    </>
  );
}
