import axios from "axios";
import { Platform } from "react-native";

export const api = axios.create({
    baseURL: `http://${Platform.OS == 'android' ? '10.0.2.2' : 'localhost'}:3000`
})

export const handleRequestError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        console.error('Axios error message:', error.message);
        if (error.response) {
          console.error('Response status:', error.response.status);
          console.error('Response data:', error.response.data);
        } else if (error.request) {
          console.error('Request made but no response:', error.request);
        } else {
          console.error('Error', error.message);
        }
      } else {
        console.error('Unexpected error:', error);
      }
}