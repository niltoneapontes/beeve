import Toast from "react-native-toast-message"

export const showToast = (type: string, text1: string, text2: string) => {
    Toast.show({
        type: type,
        text1: text1,
        text2: text2,
        text1Style: {
          fontSize: 16,
          fontFamily: 'OpenSans'
        },
        text2Style: {
          fontSize: 16,
          fontFamily: 'OpenSans',
          fontWeight: '500',
          color: '#1C1C1C'
        }
    }
    )
}