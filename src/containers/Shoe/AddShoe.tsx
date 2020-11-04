import React, {useState, useRef} from 'react';
import {Dimensions, ScrollView, Platform, StyleSheet} from 'react-native';
import styled from 'styled-components';
import Modal from 'react-native-modal';
import {RNCamera} from 'react-native-camera';
import {PERMISSIONS, RESULTS} from 'react-native-permissions';
import {
  Block,
  Text,
  Touchable,
  Input,
  Picker,
  Icon,
  Button,
} from '~/components';

import {useSetObjectState} from '~/hoocks';

import theme from '~/config/theme';

import {checkAndRequestPermission} from '~/utils';

const GATEGORIES = [
  {name: 'Hunter', value: 'Hunter'},
  {name: 'Giầy thể thao', value: 'Giầy thể thao'},
  {name: 'Giầy chạy bộ', value: 'Giầy chạy bộ'},
  {name: 'Giầy đá banh', value: 'Giầy đá banh'},
  {name: 'Giầy tây', value: 'Giầy tây'},
];

const windowHeight = Dimensions.get('window').height;

const Image = styled.Image.attrs({
  resizeMode: 'contain',
})`
  flex: 1;
  height: ${windowHeight / 3}px;
  background-color: rgba(0, 0, 0, 0.8);
`;

const ImagePicker = styled(Touchable)`
  height: ${windowHeight / 3}px;
  background-color: #1d2636;
`;

const CaptureButtonContent = styled.View`
  height: 53px;
  width: 53px;
  border-radius: 40px;
  background-color: ${theme.color.secondary};
  border: 2px solid ${theme.color.white};
`;

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

const AddShoe = () => {
  const [visible, setVisible] = useState(false);
  const [flash, setFlash] = useState('auto');
  const [horizontal] = useState(false);
  const [data, setData] = useSetObjectState({
    shoeId: '',
    uri: '',
    type: '',
  });
  const {uri, shoeId, type} = data;

  const refCamera = useRef();

  const onFlashChange = () => {
    if (flash === 'auto') {
      setFlash('off');
    } else if (flash === 'off') {
      setFlash('on');
    } else {
      setFlash('auto');
    }
  };

  const onCapture = async () => {
    if (refCamera.current) {
      const options = {
        quality: 1,
        width: 1000,
      };

      if (horizontal) {
        options.orientation =
          Platform.OS === 'ios' ? 'landscapeRight' : 'landscapeLeft';
        options.width = 1000;
      }

      try {
        const data = await refCamera.current.takePictureAsync(options);
        setData({uri: data.uri});
      } catch (e) {
        console.log('onCapture error', e);
      }
    }
  };

  const onUsePoto = () => {
    setVisible(false);
  };

  const onReCapture = () => {
    setData({uri: ''});
  };

  const onOpen = async () => {
    const permission = await checkAndRequestPermission(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    );
    if (permission === RESULTS.GRANTED) {
      setVisible(true);
    }
  };

  const onClose = () => {
    setVisible(false);
    setData({uri: ''});
  };

  const formIsValid = () => {
    return shoeId && uri;
  };

  return (
    <Block flex={1} bg="bg">
      <ScrollView>
        {!uri ? (
          <ImagePicker center middle onPress={onOpen}>
            <Icon
              name="image"
              type="fontAwesome5"
              size={50}
              color={theme.color.secondary}
            />
            <Text s2 color={theme.color.secondary}>
              Chụp ảnh
            </Text>
          </ImagePicker>
        ) : (
          // <Touchable onPress={onOpen}>
          <Image source={{uri}} />
          // </Touchable>
        )}

        <Block p="20px">
          <Input
            label="Mã giầy"
            required
            placeholder="Nhập mã giầy"
            value={shoeId}
            onChange={(val: string) => setData({shoeId: val})}
          />
          <Picker
            label="Dòng sản phẩm"
            title="Dòng sản phẩm"
            options={GATEGORIES}
            placeholder="Chọn dòng sản phẩm"
            value={type}
            onChange={(val: string) => setData({type: val})}
            m="20px 0 0"
          />
        </Block>
      </ScrollView>

      <Button
        bg="primary"
        m="20px"
        p="10px 0"
        center
        middle
        disabled={!formIsValid()}>
        <Text color={!formIsValid() ? theme.color.gray : theme.color.secondary}>
          Thêm sản phẩm
        </Text>
      </Button>

      <Modal
        isVisible={visible}
        onBackButtonPress={() => setVisible(false)}
        style={{margin: 0}}>
        {!uri ? (
          <RNCamera
            ref={refCamera}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            pauseAfterCapture
            flashMode={RNCamera.Constants.FlashMode[flash]}
            captureAudio={false}
          />
        ) : (
          <Image source={{uri}} />
        )}

        <Block row bg="bg" middle justify="space-around" p="8px 20px">
          <Touchable
            flex={1}
            alignItems="flex-start"
            onPress={!uri ? onClose : onReCapture}>
            <Text h5 color={theme.color.secondary}>
              {!uri ? 'Trở lại' : 'Chụp lại'}
            </Text>
          </Touchable>
          <Touchable center middle flex={1} onPress={onCapture}>
            {!uri ? <CaptureButtonContent /> : <Block />}
          </Touchable>
          <Touchable
            flex={1}
            alignItems="flex-end"
            onPress={!uri ? onFlashChange : onUsePoto}>
            {!uri ? (
              <Icon
                name={
                  flash === 'off'
                    ? 'ios-flash-off-sharp'
                    : flash === 'on'
                    ? 'ios-flash'
                    : 'flash-auto'
                }
                type={flash === 'auto' ? 'maturialIcons' : 'ionicons'}
                color={theme.color.secondary}
              />
            ) : (
              <Text h5 color={theme.color.secondary}>
                Sử dụng ảnh
              </Text>
            )}
          </Touchable>
        </Block>
      </Modal>
    </Block>
  );
};

export default AddShoe;
