import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LocalStorage {
    static storeData = async (key: string, value: string) => {
        try {
          await AsyncStorage.setItem(key, value);
        } catch (e) {
          console.error("Failed to save data", e);
        }
      };
      
      static getData = async (key: string) => {
        try {
          const value = await AsyncStorage.getItem(key);
          return value !== null ? value : null;
        } catch (e) {
          console.error("Failed to retrieve data", e);
        }
      };

      static removeData = async (key: string) => {
        try {
            await AsyncStorage.removeItem(key)
        } catch(e) {
            console.error("Failed to remove item")
        }
      }
}