import { DarkTheme } from '@/constants/Colors'
import React from 'react'
import { TextInput, TextInputProps} from 'react-native-paper'

interface IInput extends TextInputProps {
    label: string;
    value: string;
    onChangeText: React.Dispatch<React.SetStateAction<string>>;
}

function Input({label, value, onChangeText, ...props}: IInput) {
  return <TextInput
  label={label}
  activeOutlineColor={DarkTheme.primary}
  value={value}
  onChangeText={text => onChangeText(text)}
  style={{
    backgroundColor: 'transparent',
    width: "100%",
    height: 56,
    marginVertical: 4
  }}
  mode='outlined'
  {...props}
/>
}

export default Input