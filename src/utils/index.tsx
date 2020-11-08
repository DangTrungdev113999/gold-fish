import { Alert } from 'react-native';
import {
  check,
  request,
  openSettings,
  RESULTS,
} from 'react-native-permissions';

export function checkAndRequestPermission(permission: any | string) {
  return check(permission).then((result) => {
    if (result === RESULTS.DENIED) {
      console.log(
        'The permission has not been requested / is denied but requestable',
      );
      return request(permission).then((result) => {
        if (result === RESULTS.GRANTED) {
          console.log('The permission is granted');
          return RESULTS.GRANTED;
        }
        return RESULTS.BLOCKED;
      });
    }

    if (result === RESULTS.GRANTED) {
      console.log('The permission is granted');
      return RESULTS.GRANTED;
    }

    Alert.alert(
      'Bạn đã tắt quyền truy cập camera',
      'Mở cài đặt để cho phép truy cập.',
      [
        {
          text: 'Để sau',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Cài đặt',
          onPress: () => {
            openSettings();
          },
        },
      ],
      { cancelable: true },
    );

    return RESULTS.BLOCKED;
  });
}

export function showAlert(
  message: string,
  description = '',
  cancelable = true,
  callback: any = null,
) {
  setTimeout(() => {
    Alert.alert(
      message,
      description,
      [
        {
          text: 'Đồng ý',
          onPress: () => {
            if (callback) {
              callback();
            }
          },
        },
      ],
      { cancelable },
    );
  }, 100);
}

export function getRefToStorage(URL: string) {
  const baseURL =
    'https://firebasestorage.googleapis.com/v0/b/newProject-ca4cf.appspot.com/o/';
  let imagePath = URL.replace(baseURL, '');
  const indexOfEndPath = imagePath.indexOf('?');
  imagePath = imagePath.substring(0, indexOfEndPath);
  imagePath = imagePath.replace('%2F', '/');
  return imagePath;
}

export function findIndex() {
  
}