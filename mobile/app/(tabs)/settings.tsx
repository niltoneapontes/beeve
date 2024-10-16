import { SafeAreaView, View } from "react-native";
import { Container, Header } from "../styles/settingsStyle";
import { DarkTheme } from "@/constants/Colors";
import Title from "@/components/Title";
import Paragraph from "@/components/Paragraph";
import Button from "@/components/Button";
import { Link, useNavigation } from "expo-router";

export default function TabFourScreen() {
  const navigation = useNavigation<any>()
  return (
    <>
      <Header></Header>
      <Container>
        <Title content="Configurações" style={{ marginTop: 40, marginBottom: 32, fontSize: 32 }} />
        <View style={{ flex: 1 }} />
        <Paragraph content="Versão 1.0.0"/>
        <Paragraph content="Foto da capa: Heshan Perera na Unsplash" />
        <Button content="logout" type="white" onPress={() => {
          navigation.navigate('login')
        }}  style={{ marginTop: 40, marginBottom: 32, height: 56, width: '100%' }}/>
      </Container>
    </>
  );
}
