import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import {shoeType} from '~/@types';

export const fetchShoes = async () => {
  try {
    var shoessList: any[] = [];
    const snapshot = await firestore().collection('Shoes').get();

    snapshot.forEach((doc) => {
      const foodItem = doc.data();
      shoessList.push(foodItem);
    });

    return shoessList;
  } catch (e) {
    console.log('fetch shoes error: ', e);
  }
};

export const fetchShoeDetail = async (shoeId: string) => {
  try {
    const snapshot = await firestore().collection('Shoes').doc(shoeId).get();
    return snapshot.data();
  } catch (e) {
    console.log('fetch shoes error: ', e);
  }
};

export const addShoes = async (shoe: shoeType) => {
  shoe.createdAt = firebase.firestore.FieldValue.serverTimestamp();
  try {
    await firestore().collection('Shoes').doc(shoe.shoeId).set(shoe);
    return shoe;
  } catch (e) {
    console.log('add shoe error: ', e);
  }
};

export const updateShoes = async (shoe: shoeType) => {
  shoe.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
  try {
    await firestore().collection('Shoes').doc(shoe.shoeId).update(shoe);
    return shoe;
  } catch (e) {
    console.log('update shoe error: ', e);
  }
};

function getRefToStorage(URL: string) {
  const baseURL =
    'https://firebasestorage.googleapis.com/v0/b/newProject-ca4cf.appspot.com/o/';
  let imagePath = URL.replace(baseURL, '');
  const indexOfEndPath = imagePath.indexOf('?');
  imagePath = imagePath.substring(0, indexOfEndPath);
  imagePath = imagePath.replace('%2F', '/');
  return imagePath;
}

export const deleteShoes = async (shoe: shoeType) => {
  try {
    // const imageRef = storage().refFromURL(shoe.imageUri);
    // await imageRef.delete();

    await firestore().collection('Shoes').doc(shoe.shoeId).delete();
    return shoe;
  } catch (e) {
    console.log('delete shoe error: ', e);
  }
};

export const uploadShoeImage = async ({
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
