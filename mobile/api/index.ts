import { showToast } from "@/utilities/toast";
import axios from "axios";
import { Platform } from "react-native";

export const api = axios.create({
    baseURL: `http://${Platform.OS == 'android' ? '10.0.2.2' : 'localhost'}:3000`,
})

export const handleRequestError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
          showToast('error', 'Oops...', error.response.data.message.toString().replace("Error: ", ''))
        } else if (error.request) {
          showToast('error', 'Oops...', 'Erro na requisição')
        } else {
          showToast('error', 'Oops...', error.message.toString().replace("Error: ", ''))
        }
      } else {
        showToast('error', 'Oops...', 'Ocorreu um erro inesperado')
      }
  }