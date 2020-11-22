import firestore from '@react-native-firebase/firestore';
import { shoeTypes } from '~/@types';

export const fetchFavouriteShoesListApi = async (favouriteShoes: string[]) => {
  try {
    if (favouriteShoes.length) {
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
    } else {
      return {
        favouriteShoesList: [],
      };
    }
  } catch (e) {
    console.log('fetch shoes error: ', e.message);
    throw new Error(e);
  }
};
