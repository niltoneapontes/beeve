import { Text, View } from 'react-native';
import { Container, Header, ProfileImage } from '../styles/profileStyle';
import Title from '@/components/Title';
import Paragraph from '@/components/Paragraph';
import Button from '@/components/Button';
import { DarkTheme } from '@/constants/Colors';
import Background from '@/assets/images/background.png'
import Spacer from '@/components/Spacer';

export default function TabThreeScreen() {
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
        <Title content="Nilton Pontes" style={{ marginTop: 40, marginBottom: 32, fontSize: 32 }} />
        <Paragraph content="@niltoneapontes"/>
        <Paragraph content="niltoneapontes@gmail.com" />
        <Paragraph content="30 anos" />
        <Spacer />
        <Button content="editar" type="primary" onPress={() => {}}  style={{ marginTop: 40, marginBottom: 32, height: 56, width: '100%' }}/>
      </Container>
    </>
  );
}
