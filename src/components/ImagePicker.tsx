/* eslint-disable no-alert */
//@ts-nocheck
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
  ImagePreview,
  Body,
  Button,
} from '~/components';

import { checkAndRequestPermission, showAlert } from '~/utils';
import { deleteImageUri, uploadShoeImageApi } from '~/modules/Shoes/apis';
import { useSelector } from 'react-redux';

import theme from '~/config/theme';
import { uploadSlipperImageApi } from '~/modules/Slippers/apis';
import { ruleUserSelector } from '~/modules/User/selectors';

const windowHeight = Dimensions.get('window').height;

const ImagePickerWrapper = styled(Touchable)`
  height: ${windowHeight / 3}px;
  background-color: #1d2636;
`;

const Camera = styled.Image`
  width: 90px;
  height: 90px;
`;

const Photo = styled.Image`
  width: 50px;
  height: 50px;
`;

let options: any = {
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  quality: 1.0,
  mediaType: 'photo',
};

const ImagePicker = ({ imageUri, setData, fromScreen, type }: any) => {
  const [visible, setVisible] = useState(false);
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(false);
  const rule = useSelector(ruleUserSelector);
  const onOpen = async () => {
    if (!['admin', 'leader', 'staff'].includes(rule)) {
      showAlert('Thông báo', `Bạn chưa được cấp quyền!`);
      return;
    }
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
    const uploadImageApi =
      fromScreen === 'action_shoe' ? uploadShoeImageApi : uploadSlipperImageApi;
    if (fromScreen) {
      await uploadImageApi({
        imageUri: imgUri,
        onProgress: (p: number) => {
          setPercent(p);
        },
        onSuccess: async (uri: string) => {
          if (type === 'update' && imageUri) {
            await deleteImageUri(imageUri);
          }
          setData({ imageUri: uri });

          setLoading(false);
        },
        onErorr: (e: string) => {
          showAlert('Có lỗi khi upload ảnh.!', e);
        },
      });
    }
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
  2;
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
    <Body h={`${windowHeight / 3}px`}>
      {!imageUri ? (
        <ImagePickerWrapper center middle onPress={onOpen} disabled={loading}>
          <Photo source={require('@assets/images/photo-1.png')} />
          <Text s2 color={theme.color.secondary} m="15px 0 0">
            Upload ảnh {loading ? `${Math.floor(percent)}%` : ''}
          </Text>
        </ImagePickerWrapper>
      ) : (
        <Block>
          <ImagePreview imageUri={imageUri} />
          {imageUri && (
            <Touchable
              // bg={theme.color.blue2}
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
                <Camera source={require('@assets/images/camera.png')} />
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
