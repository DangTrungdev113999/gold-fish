import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import { shoeType } from '~/@types';

const LIMIT = 8;

export const fetchShoesApi = async () => {
  try {
    const shoesList: shoeType[] = [];
    const snapshot = await firestore()
      .collection('Shoes')
      .orderBy('createdAt', 'desc')
      .limit(LIMIT)
      .get();

    if (!snapshot.empty) {
      snapshot.forEach((doc) => {
        const foodItem = doc.data();
        shoesList.push(foodItem as shoeType);
      });
    }

    return {
      shoesList,
      lastShoe: !snapshot.empty
        ? snapshot.docs[snapshot.docs.length - 1]
        : null,
    };
  } catch (e) {
    console.log('fetch shoes error: ', e.message);
  }
};

export const fetchMoreShoesApi = async (lastShoe: any) => {
  if (lastShoe) {
    try {
      const shoesList: shoeType[] = [];
      const snapshot = await firestore()
        .collection('Shoes')
        .orderBy('createdAt', 'desc')
        .startAfter(lastShoe.data().createdAt)
        .limit(LIMIT)
        .get();

      if (!snapshot.empty) {
        snapshot.forEach((doc) => {
          const foodItem = doc.data();
          shoesList.push(foodItem as shoeType);
        });
      }

      return {
        shoesList,
        lastShoe: !snapshot.empty
          ? snapshot.docs[snapshot.docs.length - 1]
          : null,
      };
    } catch (e) {
      console.log('fetch more shoes error: ', e.message);
    }
  }
};

export const fetchShoeDetailApi = async (shoeId: string) => {
  try {
    const snapshot = await firestore().collection('Shoes').doc(shoeId).get();
    return snapshot.data();
  } catch (e) {
    console.log('fetch shoes error: ', e.message);
  }
};

export const addShoesApi = async (shoe: shoeType) => {
  shoe.createdAt = firebase.firestore.FieldValue.serverTimestamp();
  try {
    // TODO check unique
    await firestore().collection('Shoes').doc(shoe.shoeId).set(shoe);
    return shoe;
  } catch (e) {
    console.log('add shoe error: ', e.message);
  }
};

export const updateShoesApi = async (shoe: shoeType) => {
  shoe.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
  try {
    await firestore().collection('Shoes').doc(shoe.shoeId).update(shoe);
    return shoe;
  } catch (e) {
    console.log('update shoe error: ', e.message);
  }
};

export const deleteShoesApi = async (shoe: shoeType) => {
  try {
    // const imageRef = storage().refFromURL(shoe.imageUri);
    // await imageRef.delete();

    await firestore().collection('Shoes').doc(shoe.shoeId).delete();
    return shoe;
  } catch (e) {
    console.log('delete shoe error: ', e.message);
  }
};

export const uploadShoeImageApi = async ({
  imageUri,
  onProgress,
  onSuccess,
}: any) => {
  console.log(imageUri);
  const fileName = imageUri.split('/').pop();
  const reference = storage().ref(`Shoes/${fileName}`);

  await reference.putFile(imageUri as string).on(
    firebase.storage.TaskEvent.STATE_CHANGED,
    (snapshot) => {
      console.log('snapshot: ' + snapshot.state);
      const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      onProgress(percent);
      if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
        console.log('Success');
        onProgress(100);
      }
    },
    (error) => {
      // unsubscribe();
      console.log('image upload error: ' + error.toString());
    },
    () => {
      reference.getDownloadURL().then((imageUri) => {
        console.log('File available at: ' + imageUri);
        if (onSuccess) {
          onSuccess(imageUri);
        }
      });
    },
  );
};
