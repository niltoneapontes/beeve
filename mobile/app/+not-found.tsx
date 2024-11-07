import Title from '@/components/Title';
import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32
      }}>
      <Title content='😢' style={{fontSize: 120}}></Title>
      <Title content='Não foi possível acessar o app ou a tela de destino não existe'></Title>
      </View>
    </>
  );
}