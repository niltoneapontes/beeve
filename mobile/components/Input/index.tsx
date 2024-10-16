import { DarkTheme } from '@/constants/Colors'
import React from 'react'
import { TextInput } from 'react-native-paper'

interface IInput {
    label: string;
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
}

function Input({label, value, onChange}: IInput) {
  return <TextInput
  label={label}
  activeOutlineColor={DarkTheme.primary}
  value={value}
  onChangeText={text => onChange(text)}
  style={{
    backgroundColor: 'transparent',
    width: "100%",
    height: 56,
    marginVertical: 4
  }}
  mode='outlined'
/>
}

export default Input