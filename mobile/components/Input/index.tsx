import { DarkTheme, DefaultTheme } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react'
import { TextInput, TextInputProps} from 'react-native-paper'

interface IInput extends TextInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
}

function Input({label, value, onChangeText, ...props}: IInput) {
  const colorScheme = useColorScheme();

  return <TextInput
    label={label}
    activeOutlineColor={colorScheme === "dark" ? DefaultTheme.brightWhite : DarkTheme.primary}
    textColor={colorScheme === "dark" ? DefaultTheme.white : DarkTheme.primary}
    placeholderTextColor={DefaultTheme.gray}
    value={value}
    onChangeText={text => onChangeText(text)}
    style={{
      backgroundColor: colorScheme === "dark" ? DarkTheme.black : 'transparent',
      width: "100%",
      height: 56,
      marginVertical: 4
    }}
    mode='outlined'
    {...props}
  />
}

export default Input