import firestore from '@react-native-firebase/firestore';

export const addSuggestionApi = async (user: any, data: any) => {
  console.log(user, data);
  try {
    await firestore()
      .collection('Settings')
      .doc('suggestion')
      .collection('PrefixProduct')
      .doc(user.phoneNumber)
      .set({
        userId: user.phoneNumber,
        ...data,
      });

    return data;
  } catch (e) {
    console.log('add suggestion error: ', e.message);
    throw new Error(e);
  }
};
