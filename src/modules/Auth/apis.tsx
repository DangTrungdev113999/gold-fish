import auth from '@react-native-firebase/auth';
import { parsePhone } from '~/utils';

export const getFirebasePhoneAuthVerificationCode = async (
  phoneNumber: string,
) => {
  try {
    return await auth().signInWithPhoneNumber(parsePhone(phoneNumber));
  } catch (e) {
    console.log('get Firebase Phone Auth Verification Code error: ', e);
    throw new Error(e);
  }
};

export const confirmFirebasePhoneAuthToGetToken = async (
  confirmResult: any,
  verificationCode: any,
) => {
  try {
    return await confirmResult.confirm(verificationCode);
  } catch (e) {
    console.log('confirm Firebase Phone AuthToGet Token error: ', e);
    throw new Error(e);
  }
};

export const getIdToken = async () => {
  try {
    //@ts-ignore
    return await auth().currentUser.getIdTokenResult();
  } catch (e) {
    console.log('get id Token error: ', e);
    throw new Error(e);
  }
};

export const logOutApi = async () => {
  try {
    return await auth().signOut();
  } catch (e) {
    console.log('log out error: ', e);
    throw new Error(e);
  }
};
