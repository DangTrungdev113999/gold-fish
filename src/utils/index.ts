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
    'https://firebasestorage.googleapis.com/v0/b/redcat-46e47.appspot.com/o/';
  let imagePath = URL.replace(baseURL, '');
  const indexOfEndPath = imagePath.indexOf('?');
  imagePath = imagePath.substring(0, indexOfEndPath);
  imagePath = imagePath.replace('%2F', '/');
  return imagePath;
}

export function separatorCode(code: string) {
  if (code) {
    const regxNumber = /[0-9]+/;
    const numberic = code.match(regxNumber)?.[0];
    if (numberic) {
      return {
        prefix: code.split(numberic as string)[0],
        numberic,
        colorCode: code.split(numberic as string)[1],
      };
    }
    return code;
  }
  return code;
}

export function isShoeId(shoeId: string): any {
  return !!(shoeId && shoeId.match(/^([A-Z]{3,4})\d{3,8}(\-([A-Z]{2,3}))?$/g));
}

export function isSlipperId(slipperId: string): any {
  return !!(slipperId && slipperId.length >= 5);
}

export function isPhoneNumber(phoneNumber: string) {
  return phoneNumber && phoneNumber.match(/^(\+84|0)*[1-9]\d{8}$/g);
}

export function removePhoneCountryPrefix(phone: string) {
  if (phone && phone.indexOf('+84') !== -1) {
    return phone.replace('+84', '0');
  }
  return phone;
}

export function parsePhone(phone: string) {
  if (phone.indexOf('+84') === -1) {
    if (phone.slice(0, 1) === '0') {
      return `+84${phone.slice(1)}`;
    }
    return `+84${phone}`;
  }
  return phone;
}
