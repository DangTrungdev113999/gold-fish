/* eslint-disable no-alert */
import React, { useState } from 'react';
import { Dimensions, Platform } from 'react-native';
import styled from 'styled-components';
import Modal from 'react-native-modal';
import ImageResizer from 'react-native-image-resizer';
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

import { checkAndRequestPermission, showAlert } from '~/utils';
import { uploadShoeImageApi } from '~/modules/shoes/apis';

import theme from '~/config/theme';

const windowHeight = Dimensions.get('window').height;

const ImagePickerWrapper = styled(Touchable)`
  height: ${windowHeight / 3}px;
  background-color: #1d2636;
`;

let options: any = {
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  quality: 1.0,
  mediaType: 'photo',
};

const ImagePicker = ({ imageUri, setData }: any) => {
  const [visible, setVisible] = useState(false);
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(false);

  const onOpen = async () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const resizeImage = (imgUri: string) => {
    setLoading(true);
    ImageResizer.createResizedImage(imgUri, 400, 200, 'JPEG', 100)
      .then(({ uri }) => {
        onUploadImage(uri);
      })
      .catch((err) => {
        setLoading(false);
        console.log('resize image err: ', err);
        return showAlert(
          'Unable to resize the photo',
          'Check the console for full the error message',
        );
      });
  };

  const onUploadImage = async (imgUri: string) => {
    onClose();
    setPercent(2);
    await uploadShoeImageApi({
      imageUri: imgUri,
      onProgress: (p: number) => {
        setPercent(p);
      },
      onSuccess: (uri: string) => {
        setData({ imageUri: uri });
        setLoading(false);
      },
      onErorr: (e: string) => {
        showAlert('Có lỗi khi upload ảnh.!', e);
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
          resizeImage(response.uri);
        }
      });
    }
  };

  const launchImageLibrary = async () => {
    const permission = await checkAndRequestPermission(
      Platform.OS === 'ios'
        ? //@ts-ignore
          PERMISSIONS.IOS.WRITE_EXTERNAL_STORAGE
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
          resizeImage(response.uri);
        }
      });
    }
  };

  return (
    <Body h={`${windowHeight / 3}px`} flex={1}>
      {!imageUri ? (
        <ImagePickerWrapper center middle onPress={onOpen} disabled={loading}>
          <Icon
            name="image"
            type="fontAwesome5"
            size={50}
            color={theme.color.secondary}
          />
          <Text s2 color={theme.color.secondary}>
            Upload ảnh {loading ? `${Math.floor(percent)}%` : ''}
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
              disabled={loading}>
              {loading ? (
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
