import firestore from '@react-native-firebase/firestore';

export const fetchSuggestionApi = async (profile: any) => {
  try {
    const snapshot = await firestore()
      .collection('Settings')
      .doc('suggestion')
      .collection('PrefixProduct')
      .doc(profile.phoneNumber)
      .get();

    return snapshot.data();
  } catch (e) {
    console.log('fetch suggestion error: ', e.message);
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

export const fetchUserApi = async (phoneNumber: any) => {
  try {
    const snapshot = await firestore()
      .collection('Users')
      .doc(phoneNumber)
      .get();

    return snapshot.data();
  } catch (e) {
    console.log('fetch user error: ', e.message);
    throw new Error(e);
  }
};

export const addNewUserApi = async (user: any) => {
  try {
    await firestore()
      .collection('Users')
      .doc(user.profile.phoneNumber)
      .set({
        ...user,
      });

    return user;
  } catch (e) {
    console.log('add user error: ', e.message);
    throw new Error(e);
  }
};

export const updateUserApi = async (userId: string, data: any) => {
  try {
    await firestore()
      .collection('Users')
      .doc(userId)
      .update({
        ...data,
      });

    return data;
  } catch (e) {
    console.log('update user error: ', e.message);
    throw new Error(e);
  }
};
