import firestore from '@react-native-firebase/firestore';

export const fetchProductTypesApi = async () => {
  try {
    const snapshot = await firestore()
      .collection('Settings')
      .doc('productTypes')
      .get();

    return {
      shoeTypes: snapshot.data()?.shoeTypes,
      slipperTypes: snapshot.data()?.slipperTypes,
    };
  } catch (e) {
    console.log('fetch product types error: ', e.message);
  }
};
