import axios from "axios";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";

export const api = axios.create({
    baseURL: `http://${Platform.OS == 'android' ? '10.0.2.2' : 'localhost'}:3000`
})

export const handleRequestError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
          Toast.show({
            type: 'error',
            text1: 'Oops...',
            text2: error.response.data.message.toString().replace("Error: ", ''),
            text1Style: {
              fontSize: 16,
              fontFamily: 'OpenSans'
            },
            text2Style: {
              fontSize: 16,
              fontFamily: 'OpenSans'
            }
          })
        } else if (error.request) {
          Toast.show({
            type: 'error',
            text1: 'Oops...',
            text2: 'Erro na requisição',
            text1Style: {
              fontSize: 16,
              fontFamily: 'OpenSans'
            },
            text2Style: {
              fontSize: 16,
              fontFamily: 'OpenSans'
            }
          })
        } else {
          Toast.show({
            type: 'error',
            text1: 'Oops...',
            text2: error.message.toString().replace("Error: ", ''),
            text1Style: {
              fontSize: 16,
              fontFamily: 'OpenSans'
            },
            text2Style: {
              fontSize: 16,
              fontFamily: 'OpenSans'
            }
          })
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Oops...',
          text2: 'Ocorreu um erro inesperado',
          text1Style: {
            fontSize: 16,
            fontFamily: 'OpenSans'
          },
          text2Style: {
            fontSize: 16,
            fontFamily: 'OpenSans'
          }
        })
      }
  }