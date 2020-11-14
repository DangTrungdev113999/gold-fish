/* eslint-disable react-hooks/exhaustive-deps */
//@ts-nocheck
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import {
  Block,
  Body,
  Button,
  Icon,
  Input,
  ScrollBody,
  Text,
  Touchable,
} from '~/components';
import theme from '~/config/theme';
import { useSetObjectState } from '~/hoocks';
import { updateProductTypesLoadingSelector } from '~/modules/Settings/selectors';
import { updateProductTypesCreator } from '~/modules/Settings/thunk';
import { showAlert } from '~/utils';

const windowHeight = Dimensions.get('window').height;

type PropsType = {
  data: any;
  target: string;
};

const AddModal = ({ items, target }: PropsType) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useSetObjectState({
    name: '',
    description: '',
  });

  const dispatch = useDispatch();
  const updateProductTypesLoading = useSelector(
    updateProductTypesLoadingSelector,
  );
  const inputRef = useRef();

  const onReset = () => {
    Keyboard.dismiss();
    setData({
      name: '',
      description: '',
    });
  };

  const onOpen = () => {
    onReset();
    setVisible(true);
  };

  const onClose = () => {
    onReset();
    setVisible(false);
  };

  const onAdd = () => {
    if (
      !items.filter(
        (item) =>
          item.name.toLocaleLowerCase() === data.name.toLocaleLowerCase(),
      ).length
    ) {
      const alphaData = [...items];
      alphaData.push(data);
      dispatch(
        updateProductTypesCreator({
          data: alphaData,
          target,
          onSuccess: () => {
            onReset();
            Toast.show('Thêm danh mục thành công !');
          },
          onError: (e) => {
            showAlert('Thông báo', e);
          },
        }),
      );
    } else {
      onReset();
      showAlert('Thông báo', 'Danh mục này đã tồn tại');
    }
  };

  const formIsValid = () => {
    return !!(data.name.length > 3);
  };

  return (
    <Block absolute right="20px" bottom="40px" keybordAvoid>
      <Touchable
        w="60px"
        h="60px"
        borderRadius="30px"
        bg={theme.color.grayLight}
        center
        middle
        shadow
        onPress={onOpen}>
        <Icon
          name="add"
          type="ionicons"
          size={30}
          color={theme.color.secondary}
        />
      </Touchable>
      <Modal
        isVisible={visible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropColor={theme.color.neutral8}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        backdropOpacity={0.6}
        style={{ margin: 0, justifyContent: 'flex-end' }}>
        <Block h={windowHeight / 2} borderRadius="15px" bg="#1D2636">
          <Touchable row justify="space-around" middle block h="40px">
            <Touchable flex={1} />
            <Touchable flex={1} onPress={onClose} center middle m="0 0 0 20px">
              <Icon
                name="ios-chevron-down-sharp"
                type="ionicons"
                size={30}
                color={theme.color.secondary}
              />
            </Touchable>

            <Touchable
              flex={1}
              row
              justify="flex-end"
              m="0 20px 0 0"
              onPress={onReset}>
              <Text color={theme.color.secondary}>Reset</Text>
            </Touchable>
          </Touchable>
          <Block h="0.5px" block bg={theme.color.primaryLight} />
          <ScrollBody flex={1} bg="#1D2636">
            <Input
              ref={inputRef}
              required
              label={`Nhập ${target}`}
              m="20px 20px 0"
              placeholder={`Nhập ${target}`}
              autoCapitalize="words"
              value={data.name}
              onChangeText={(val: string) => setData({ name: val })}
            />
            <Input
              ref={inputRef}
              label="Mô tả"
              m="20px 20px 0"
              placeholder="Mô tả"
              autoCapitalize="words"
              value={data.description}
              onChangeText={(val: string) => setData({ name: val })}
            />
          </ScrollBody>
          <Button
            bg="primary"
            m="20px"
            p="10px 0"
            center
            middle
            disabled={!formIsValid()}
            onPress={onAdd}>
            <Text
              color={
                !formIsValid() ? theme.color.grayLight : theme.color.secondary
              }>
              {updateProductTypesLoading ? 'loading...' : 'Thêm'}
            </Text>
          </Button>
        </Block>
      </Modal>
    </Block>
  );
};

export default AddModal;
