import { SafeAreaView, View } from "react-native";
import { Container, Header } from "../styles/settingsStyle";
import { DarkTheme } from "@/constants/Colors";
import Title from "@/components/Title";
import Paragraph from "@/components/Paragraph";
import Button from "@/components/Button";
import { Link, useNavigation } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "@/context/auth";

export default function TabFourScreen() {
  const navigation = useNavigation<any>()

  const { logout } = useContext(AuthContext)

  return (
    <>
      <Header></Header>
      <Container>
        <Title content="Configurações" style={{ marginTop: 40, marginBottom: 32, fontSize: 32 }} />
        <View style={{ flex: 1 }} />
        <Paragraph content="Foto da capa: Heshan Perera na Unsplash" />
        <Paragraph content="Versão 1.0.0"/>
        <Button content="logout" type="white" onPress={() => {
          logout()
          navigation.navigate('index')
        }}  style={{ marginTop: 40, marginBottom: 32, height: 56, width: '100%' }}/>
      </Container>
    </>
  );
}
