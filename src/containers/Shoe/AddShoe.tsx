import React, {useState} from 'react';
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

import {checkAndRequestPermission} from '~/utils';

const GATEGORIES = [
  {name: 'Hunter', value: 'Hunter'},
  {name: 'Giầy thể thao', value: 'Giầy thể thao'},
  {name: 'Giầy chạy bộ', value: 'Giầy chạy bộ'},
  {name: 'Giầy đá banh', value: 'Giầy đá banh'},
  {name: 'Giầy tây', value: 'Giầy tây'},
];

const windowHeight = Dimensions.get('window').height;

const ImagePicker = styled(Touchable)`
  height: ${windowHeight / 3}px;
  background-color: #1d2636;
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

  return (
    <Block flex={1} bg="bg">
      <ScrollView>
        <ImagePicker center middle onPress={onOpen}>
          <Icon name="image" type="fontAwesome5" size={50} color="#11ECE5" />
          <Text s2 color="#11ECE5">
            Chọn ảnh
          </Text>
        </ImagePicker>
        <Block p="20px">
          <Input label="Mã giầy" required placeholder="Nhập mã giầy" />
          <Picker
            label="Dòng sản phẩm"
            title="Dòng sản phẩm"
            options={GATEGORIES}
            placeholder="Chọn dòng sản phẩm"
            m="20px 0 0"
          />
        </Block>
      </ScrollView>

      <Button bg="primary" m="20px" p="10px 0" center middle>
        <Text color="#11ECE5">Thêm sản phẩm</Text>
      </Button>

      <Modal
        isVisible={visible}
        onBackButtonPress={() => setVisible(false)}
        style={{margin: 0}}>
        <RNCamera
          style={styles.preview}
          googleVisionBarcodeType={
            RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.QR_CODE
          }
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          captureAudio={false}>
          <Block></Block>
        </RNCamera>
      </Modal>
    </Block>
  );
};

export default AddShoe;
