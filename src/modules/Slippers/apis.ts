import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import { slipperType } from '~/@types';
import { getRefToStorage } from '~/utils';

const LIMIT = 8;

export const fetchSlippersApi = async (type: string) => {
  try {
    const slippersList: slipperType[] = [];
    let snapshot;
    if (type === 'Tất cả') {
      snapshot = await firestore()
        .collection('Slippers')
        .orderBy('createdAt', 'desc')
        .limit(LIMIT)
        .get();
    } else {
      snapshot = await firestore()
        .collection('Slippers')
        .where('type', '==', type)
        .get();
    }

    if (!snapshot.empty) {
      snapshot.forEach((doc) => {
        const slipperItem = doc.data();
        slippersList.push(slipperItem as slipperType);
      });
    }

    return {
      slippersList,
      lastSlipper: !snapshot.empty
        ? snapshot.docs[snapshot.docs.length - 1].data()
        : null,
    };
  } catch (e) {
    console.log('fetch slippers error: ', e.message);
    throw new Error(e);
  }
};

export const fetchMoreSlippersApi = async (lastSlipper: any) => {
  if (lastSlipper) {
    try {
      const slippersList: slipperType[] = [];
      const snapshot = await firestore()
        .collection('Slippers')
        .orderBy('createdAt', 'desc')
        .startAfter(lastSlipper.createdAt)
        .limit(LIMIT)
        .get();

      if (!snapshot.empty) {
        snapshot.forEach((doc) => {
          const slipperItem = doc.data();
          slippersList.push(slipperItem as slipperType);
        });
      }

      return {
        slippersList,
        lastSlipper: !snapshot.empty
          ? snapshot.docs[snapshot.docs.length - 1].data()
          : null,
      };
    } catch (e) {
      console.log('fetch more slippers error: ', e.message);
      throw new Error(e);
    }
  }
};

export const fetchSlipperDetailApi = async (slipperId: string) => {
  try {
    const snapshot = await firestore()
      .collection('Slippers')
      .doc(slipperId)
      .get();
    return snapshot.data();
  } catch (e) {
    console.log('fetch slippers error: ', e.message);
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

export const addSlippersApi = async (slipper: slipperType) => {
  try {
    const checkSlipperVisible = await fetchSlipperDetailApi(slipper.slipperId);

    if (checkSlipperVisible?.shoeId) {
      if (checkSlipperVisible?.imageUri) {
        await deleteImageUri(slipper.imageUri);
      }
      throw `Mã ${checkSlipperVisible.shoeId} đã tồn tại !`;
    }
    slipper.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    await firestore()
      .collection('Slippers')
      .doc(slipper.slipperId)
      .set(slipper);
    return slipper;
  } catch (e) {
    console.log('add slipper error: ', e.message);
    throw new Error(e);
  }
};

export const updateSlippersApi = async (slipper: slipperType) => {
  slipper.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
  try {
    await firestore()
      .collection('Slippers')
      .doc(slipper.slipperId)
      .update(slipper);
    return slipper;
  } catch (e) {
    console.log('update slipper error: ', e.message);
    throw new Error(e);
  }
};

export const deleteSlippersApi = async (slipper: slipperType) => {
  try {
    if (slipper.imageUri) {
      await deleteImageUri(slipper.imageUri);
    }

    await firestore().collection('Slippers').doc(slipper.slipperId).delete();
    return slipper;
  } catch (e) {
    console.log('delete slipper error: ', e.message);
    throw new Error(e);
  }
};

export const uploadSlipperImageApi = async ({
  imageUri,
  onProgress,
  onSuccess,
  onError,
}: any) => {
  const fileName = imageUri.split('/').pop();
  const reference = storage().ref(`Slippers/${fileName}`);

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
      reference.getDownloadURL().then((resImgUri) => {
        console.log('File available at: ' + resImgUri);
        if (onSuccess) {
          onSuccess(resImgUri);
        }
      });
    },
  );
};

export const searchSlippersApi = async (searchString: string) => {
  try {
    const slippersMatch: slipperType[] = [];
    const snapshot = await firestore()
      .collection('Slippers')
      .orderBy('slipperId')
      .startAt(searchString)
      .endAt(searchString + '\uf8ff')
      .limit(20)
      .get();

    if (!snapshot.empty) {
      snapshot.forEach((doc) => {
        const slipperItem = doc.data();
        slippersMatch.push(slipperItem as slipperType);
      });
    }

    return slippersMatch;
  } catch (e) {
    console.log('search slippers error: ', e.message);
    throw new Error(e);
  }
};
