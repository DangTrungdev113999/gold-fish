import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import { shoeTypes } from '~/@types';
import { getRefToStorage } from '~/utils';

const LIMIT = 8;

export const fetchShoesApi = async (type: string) => {
  try {
    const shoesList: shoeTypes[] = [];
    let snapshot;
    if (type === 'Tất cả') {
      snapshot = await firestore()
        .collection('Shoes')
        .orderBy('createdAt', 'desc')
        .limit(LIMIT)
        .get();
    } else {
      snapshot = await firestore()
        .collection('Shoes')
        .where('type', '==', type)
        .get();
    }

    if (!snapshot.empty) {
      snapshot.forEach((doc) => {
        const shoeItem = doc.data();
        shoesList.push(shoeItem as shoeTypes);
      });
    }

    return {
      shoesList,
      lastShoe: !snapshot.empty
        ? snapshot.docs[snapshot.docs.length - 1].data()
        : null,
    };
  } catch (e) {
    console.log('fetch shoes error: ', e.message);
    throw new Error(e);
  }
};

export const fetchMoreShoesApi = async (lastShoe: any) => {
  if (lastShoe) {
    try {
      const shoesList: shoeTypes[] = [];
      const snapshot = await firestore()
        .collection('Shoes')
        .orderBy('createdAt', 'desc')
        .startAfter(lastShoe.createdAt)
        .limit(LIMIT)
        .get();

      if (!snapshot.empty) {
        snapshot.forEach((doc) => {
          const shoeItem = doc.data();
          shoesList.push(shoeItem as shoeTypes);
        });
      }

      return {
        shoesList,
        lastShoe: !snapshot.empty
          ? snapshot.docs[snapshot.docs.length - 1].data()
          : null,
      };
    } catch (e) {
      console.log('fetch more shoes error: ', e.message);
      throw new Error(e);
    }
  }
};

export const fetchShoeDetailApi = async (shoeId: string) => {
  try {
    const snapshot = await firestore().collection('Shoes').doc(shoeId).get();
    return snapshot.data();
  } catch (e) {
    console.log('fetch shoes error: ', e.message);
    throw new Error(e);
  }
};

export const deleteImageUri = async (imageUri: string) => {
  try {
    const imageRef = storage().ref(getRefToStorage(imageUri));
    if (imageRef) {
      await imageRef.delete();
    }
  } catch (e) {
    console.log('delete iamge error: ', e.message);
    throw new Error(e);
  }
};

export const addShoesApi = async (shoe: shoeTypes) => {
  try {
    const checkShoeVisible = await fetchShoeDetailApi(shoe.shoeId);

    if (checkShoeVisible?.shoeId) {
      if (checkShoeVisible?.imageUri) {
        await deleteImageUri(shoe.imageUri);
      }
      throw `Mã ${checkShoeVisible.shoeId} đã tồn tại !`;
    }
    shoe.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    await firestore().collection('Shoes').doc(shoe.shoeId).set(shoe);
    return shoe;
  } catch (e) {
    console.log('add shoe error: ', e.message);
    throw new Error(e);
  }
};

export const updateShoesApi = async (shoe: shoeTypes) => {
  shoe.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
  try {
    await firestore().collection('Shoes').doc(shoe.shoeId).update(shoe);
    return shoe;
  } catch (e) {
    console.log('update shoe error: ', e.message);
    throw new Error(e);
  }
};

export const deleteShoesApi = async (shoe: shoeTypes) => {
  try {
    if (shoe.imageUri) {
      await deleteImageUri(shoe.imageUri);
    }

    await firestore().collection('Shoes').doc(shoe.shoeId).delete();
    return shoe;
  } catch (e) {
    console.log('delete shoe error: ', e.message);
    throw new Error(e);
  }
};

export const uploadShoeImageApi = async ({
  imageUri,
  onProgress,
  onSuccess,
  onError,
}: any) => {
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
      console.log('image upload error: ' + error.toString());
      onError(error.message);
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

export const searchShoesApi = async (searchString: string) => {
  try {
    const shoesMatch: shoeTypes[] = [];
    const snapshot = await firestore()
      .collection('Shoes')
      .orderBy('shoeId')
      .startAt(searchString)
      .endAt(searchString + '\uf8ff')
      .limit(20)
      .get();

    if (!snapshot.empty) {
      snapshot.forEach((doc) => {
        const shoeItem = doc.data();
        shoesMatch.push(shoeItem as shoeTypes);
      });
    }

    return shoesMatch;
  } catch (e) {
    console.log('search shoes error: ', e.message);
    throw new Error(e);
  }
};

export const fetchFavouriteShoesListApi = async (favouriteShoes: string[]) => {
  try {
    const favouriteShoesList: shoeTypes[] = [];
    const snapshot = await firestore()
      .collection('Shoes')
      .where('shoeId', 'in', favouriteShoes)
      .get();

    if (!snapshot.empty) {
      snapshot.forEach((doc) => {
        const shoeItem = doc.data();
        favouriteShoesList.push(shoeItem as shoeTypes);
      });
    }

    return {
      favouriteShoesList,
    };
  } catch (e) {
    console.log('fetch shoes error: ', e.message);
    throw new Error(e);
  }
};
