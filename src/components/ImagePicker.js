import React, { useRef, useState } from 'react';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import styled from 'styled-components';
import Modal from 'react-native-modal';
import { RNCamera } from 'react-native-camera';
import ImagePickerTest from 'react-native-image-picker';
import { PERMISSIONS, RESULTS } from 'react-native-permissions';

import {
  Block,
  Text,
  Touchable,
  Icon,
  ImagePreview,
  Body,
  Button,
} from '~/components';

import { checkAndRequestPermission } from '~/utils';

import theme from '~/config/theme';

import { uploadShoeImageApi } from '~/modules/shoes/apis';

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

let options = {
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  quality: 1.0,
  mediaType: 'photo',
};

const ImagePicker = ({ imageUri, setData, type }) => {
  const [visible, setVisible] = useState(false);
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(false);

  const onOpen = async () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onUploadImage = async (imageUri) => {
    onClose();
    setPercent(2);
    await uploadShoeImageApi({
      imageUri,
      onProgress: (p) => {
        setPercent(p);
      },
      onSuccess: (uri) => {
        setData({ imageUri: uri });
      },
    });
  };

  const launchCamera = async () => {
    const permission = await checkAndRequestPermission(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    );
    if (permission === RESULTS.GRANTED) {
      ImagePickerTest.launchCamera(options, async (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          console.log('response', JSON.stringify(response.uri));
          onUploadImage(response.uri);
        }
      });
    }
  };

  const launchImageLibrary = async () => {
    const permission = await checkAndRequestPermission(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.WRITE_EXTERNAL_STORAGE
        : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    );
    if (permission === RESULTS.GRANTED) {
      ImagePickerTest.launchImageLibrary(options, async (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          console.log('response', JSON.stringify(response.uri));
          onUploadImage(response.uri);
        }
      });
    }
  };

  return (
    <Body h={`${windowHeight / 3}px`} flex={1} overlay loading={loading}>
      {!imageUri ? (
        <ImagePickerWrapper center middle onPress={onOpen}>
          <Icon
            name="image"
            type="fontAwesome5"
            size={50}
            color={theme.color.secondary}
          />
          <Text s2 color={theme.color.secondary}>
            Upload ảnh{' '}
            {percent > 0 && percent !== 100 ? `${Math.floor(percent)}%` : ''}
          </Text>
        </ImagePickerWrapper>
      ) : (
        <Block>
          <ImagePreview imageUri={imageUri} />
          {imageUri && (
            <Touchable
              bg="rgba(255, 255, 255, 0.8)"
              w="90px"
              h="90px"
              center
              middle
              borderRadius="45px"
              absolute
              bottom="5px"
              left="5px"
              onPress={onOpen}
              disabled={percent > 0 && percent !== 100}>
              {percent > 0 && percent !== 100 ? (
                <Text h3 color={theme.color.black}>
                  {Math.floor(percent)}%
                </Text>
              ) : (
                <Icon name="camera" type="fontAwesome" color="#000" size={50} />
              )}
            </Touchable>
          )}
        </Block>
      )}

      <Modal
        isVisible={visible}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        backdropOpacity={0.6}
        style={{ margin: 0, justifyContent: 'flex-end' }}>
        <Block bg="bg" p="20px 0">
          <Button
            bg="primary"
            m="0 20px"
            p="10px 0"
            center
            middle
            onPress={launchCamera}>
            <Text color={theme.color.secondary}>Chụp ảnh</Text>
          </Button>
          <Button
            bg="primary"
            m="10px 20px 0"
            p="10px 0"
            center
            middle
            onPress={launchImageLibrary}>
            <Text color={theme.color.secondary}>Chọn ảnh từ thư viện</Text>
          </Button>
        </Block>
      </Modal>
    </Body>
  );
};

export default ImagePicker;
