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
    throw new Error(e);
  }
};

const permission = false;

export const udpateProductTypesApi = async (data: any, target: string) => {
  try {
    if (permission === false) {
      throw new Error('Bạn chưa được cấp quyền để thực hiện');
    }

    if (data[0].name !== 'Tất cả') {
      throw new Error('Không được di chuyển mục "Tất cả"');
    } else {
      const TabsSettingMap = {
        'Loại giày': 'shoeTypes',
        'Loại dép': 'slipperTypes',
      };
      await firestore()
        .collection('Settings')
        .doc('productTypes')
        .update({
          //@ts-ignore
          [TabsSettingMap[target]]: data,
        });
      return {
        //@ts-ignore
        [TabsSettingMap[target]]: data,
      };
    }
  } catch (e) {
    console.log('update product types error: ', e.message);
    throw new Error(e);
  }
};
