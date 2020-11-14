/* eslint-disable prettier/prettier */
//@ts-nocheck
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import {
  Block,
  Button,
  Input,
  Picker,
  Text,
  ImagePicker,
  Body,
} from '~/components';
import theme from '~/config/theme';
import { useSetObjectState } from '~/hoocks';

import { updateShoeCreator, addShoeCreator } from '~/modules/Shoes/thunk';
import {
  addShoeLoadingSelector,
  updateShoeLoadingSelector,
} from '~/modules/Shoes/selectors';
import { isShoeId, showAlert } from '~/utils';
import { deleteShoeLoadingSelector } from '~/modules/Shoes/selectors';
import { shoeTypesSelector } from '~/modules/Settings/selectors';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import TextInput from '~/components/Input';

const KeyboardAvoidingComponent = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.header}>Header</Text>
          <TextInput placeholder="Username" style={styles.textInput} />
          <View style={styles.btnContainer}>
            <Button title="Submit" onPress={() => null} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});

const ActionShoe = ({ navigation, route }: any) => {
  const [data, setData] = useSetObjectState({
    shoeId: '',
    imageUri: '',
    type: 'Hunter',
    like: false,
  });

  const [shoeIdIsValid, setShoeIdIsValid] = useState(true);

  const dispatch = useDispatch();
  const updateShoesLoading = useSelector(updateShoeLoadingSelector);
  const addShoesLoading = useSelector(addShoeLoadingSelector);
  const deleteShoesLoading = useSelector(deleteShoeLoadingSelector);
  const shoeTypes = useSelector(shoeTypesSelector);

  useEffect(() => {
    if (route.params?.shoeDetail?.shoeId) {
      setData({ ...route.params.shoeDetail });
    }

    return () => {
      setData({
        shoeId: '',
        imageUri: '',
        type: 'Hunter',
        like: false,
      });
    };
  }, [route.params?.shoeDetail?.shoeId]);

  const onActionShoe = async () => {
    if (route.params.type === 'add') {
      dispatch(
        addShoeCreator({
          shoe: data,
          onSuccess: () => {
            navigation.navigate('shoes_screen');
          },
          onError: (e: string) => {
            showAlert('Thông báo!', e);
            setData({
              shoeId: '',
              imageUri: '',
              type: 'Hunter',
              like: false,
            });
          },
        }),
      );
    } else if (route.params.type === 'update') {
      dispatch(
        updateShoeCreator({
          shoe: data,
          onSuccess: () => {
            Toast.show('Cập nhật thành công !');
          },
          onError: (e: string) => {
            showAlert('Thông báo!', e);
          },
        }),
      );
    }
  };

  const checkShoeId = () => {
    const result = isShoeId(data.shoeId);
    setShoeIdIsValid(result);
  };

  const onSetShoeId = (shoeId: string) => {
    if (shoeId.length > 12) {
      Keyboard.dismiss();
    }
    setData({ shoeId });
  };

  const formIsValid = () => {
    return isShoeId(data.shoeId) && data.imageUri;
  };

  // if (true) {
  //   return (
  //     <KeyboardAvoidingView
  //       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  //       style={{ flex: 1, backgroundColor: theme.color.blue1 }}>
  //       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  //         <Block m="550px 0 0">
  //           <Input
  //             label="Mã giày"
  //             required
  //             placeholder="Nhập mã giày"
  //             value={data.shoeId}
  //             disabled={route.params.type === 'update'}
  //             iconLeftName="tago"
  //             iconLeftType="antDesign"
  //             autoCapitalize="characters"
  //             onChangeText={onSetShoeId}
  //             description={!shoeIdIsValid ? 'Mã giày không đúng định dạng' : ''}
  //             danger={!shoeIdIsValid}
  //             onBlur={checkShoeId}
  //             maxLength={13}
  //           />
  //         </Block>
  //       </TouchableWithoutFeedback>
  //     </KeyboardAvoidingView>
  //   );
  // }

  return (
    <Body
      flex={1}
      overlay
      loading={updateShoesLoading || addShoesLoading || deleteShoesLoading}>
      {/* <ScrollView> */}
      <ImagePicker
        imageUri={data.imageUri}
        setData={setData}
        fromScreen="action_shoe"
      />

      <Block p="30px 20px 20px">
        <Input
          label="Mã giày"
          required
          placeholder="Nhập mã giày"
          value={data.shoeId}
          disabled={route.params.type === 'update'}
          iconLeftName="tago"
          iconLeftType="antDesign"
          autoCapitalize="characters"
          onChangeText={onSetShoeId}
          description={!shoeIdIsValid ? 'Mã giày không đúng định dạng' : ''}
          danger={!shoeIdIsValid}
          onBlur={checkShoeId}
          maxLength={13}
        />
        <Picker
          label="Dòng sản phẩm"
          title="Dòng sản phẩm"
          options={shoeTypes
            .map((item) => ({
              name: item.name,
              value: item.name,
            }))
            .slice(1)}
          placeholder="Chọn dòng sản phẩm"
          value={data.type}
          onChange={(val: string) => setData({ type: val })}
          m="20px 0 0"
        />
      </Block>
      {/* </ScrollView> */}

      <Button
        bg="primary"
        m="20px"
        p="10px 0"
        center
        middle
        disabled={!formIsValid()}
        onPress={onActionShoe}>
        <Text
          color={
            !formIsValid() ? theme.color.grayLight : theme.color.secondary
          }>
          {route.params.type === 'add' ? 'Thêm sản phẩm' : 'Cập nhật sản phẩm'}
        </Text>
      </Button>
    </Body>
  );
};

export default ActionShoe;
