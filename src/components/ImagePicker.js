import React, {useRef, useState} from 'react';
import {Dimensions, Platform, StyleSheet} from 'react-native';
import styled from 'styled-components';
import Modal from 'react-native-modal';
import {RNCamera} from 'react-native-camera';
import {PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Block, Text, Touchable, Icon, ImagePreview} from '~/components';

import {checkAndRequestPermission} from '~/utils';

import theme from '~/config/theme';

import {uploadShoeImage} from '~/modules/shoes/api';

const windowHeight = Dimensions.get('window').height;

const ImagePickerWrapper = styled(Touchable)`
  height: ${windowHeight / 3}px;
  background-color: #1d2636;
`;

const Image = styled.Image.attrs({
  resizeMode: 'contain',
})`
  flex: 1;
  height: ${windowHeight / 3}px;
  background-color: rgba(0, 0, 0, 0.8);
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

const ImagePicker = ({imageUri, setData}) => {
  const [visible, setVisible] = useState(false);
  const [flash, setFlash] = useState('auto');
  const [percent, setPercent] = useState(0);
  const [horizontal] = useState(false);

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
        console.log(data);
        setData({imageUri: data.uri});
      } catch (e) {
        console.log('onCapture error', e);
      }
    }
  };

  const onReCapture = () => {
    setData({imageUri: ''});
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
    setData({imageUri: ''});
  };

  const onUsePoto = async () => {
    await uploadShoeImage({
      imageUri,
      onProgress: (p) => {
        if (p === 100) {
          setVisible(false);
        }
        setPercent(p);
      },
      onSuccess: (iamgeUri) => {
        setData({imageUri});
      },
    });
  };

  return (
    <Block>
      {!imageUri ? (
        <ImagePickerWrapper center middle onPress={onOpen}>
          <Icon
            name="image"
            type="fontAwesome5"
            size={50}
            color={theme.color.secondary}
          />
          <Text s2 color={theme.color.secondary}>
            Chụp ảnh
          </Text>
        </ImagePickerWrapper>
      ) : (
        <ImagePreview imageUri={imageUri} />
      )}

      <Modal
        isVisible={visible}
        onBackButtonPress={() => setVisible(false)}
        style={{margin: 0}}>
        {!imageUri ? (
          <RNCamera
            ref={refCamera}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            pauseAfterCapture
            flashMode={RNCamera.Constants.FlashMode[flash]}
            captureAudio={false}
          />
        ) : (
          <Image source={{uri: imageUri}} />
        )}
        <Block block h="1px">
          <Block w={`${percent}%`} h="100%" bg="secondary" />
        </Block>
        <Block row h="70px" p="8px 20px" bg="bg" middle justify="space-around">
          <Touchable
            flex={1}
            alignItems="flex-start"
            onPress={!imageUri ? onClose : onReCapture}>
            <Text h5 color={theme.color.secondary}>
              {!imageUri ? 'Trở lại' : 'Chụp lại'}
            </Text>
          </Touchable>

          <Touchable center middle flex={1} onPress={onCapture}>
            {!imageUri ? <CaptureButtonContent /> : <Block />}
          </Touchable>

          <Touchable
            flex={1}
            alignItems="flex-end"
            onPress={!imageUri ? onFlashChange : onUsePoto}>
            {!imageUri ? (
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

export default ImagePicker;
