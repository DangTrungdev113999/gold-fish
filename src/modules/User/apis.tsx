import firestore from '@react-native-firebase/firestore';

export const fetchSuggestionApi = async (user: any) => {
  try {
    const snapshot = await firestore()
      .collection('Settings')
      .doc('suggestion')
      .collection('PrefixProduct')
      .doc(user.phoneNumber)
      .get();

    return snapshot.data();
  } catch (e) {
    console.log('add suggestion error: ', e.message);
    throw new Error(e);
  }
};

export const addSuggestionApi = async (user: any, data: any) => {
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

export const updateSuggestionApi = async (user: any, data: any) => {
  console.log(user, data);
  try {
    await firestore()
      .collection('Settings')
      .doc('suggestion')
      .collection('PrefixProduct')
      .doc(user.phoneNumber)
      .update({
        ...data,
      });

    return data;
  } catch (e) {
    console.log('update suggestion error: ', e.message);
    throw new Error(e);
  }
};
