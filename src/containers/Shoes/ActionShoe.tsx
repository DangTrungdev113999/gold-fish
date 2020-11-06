import React from 'react';
import {ScrollView} from 'react-native';
import {
  Block,
  Button,
  Input,
  Picker,
  Text,
  ImagePicker,
  ImagePreview,
} from '~/components';
import theme from '~/config/theme';
import {useSetObjectState} from '~/hoocks';
import {addShoes, updateShoes} from '~/modules/shoes/api';

const GATEGORIES = [
  {name: 'Hunter', value: 'Hunter'},
  {name: 'Giầy thể thao', value: 'Giầy thể thao'},
  {name: 'Giầy chạy bộ', value: 'Giầy chạy bộ'},
  {name: 'Giầy đá banh', value: 'Giầy đá banh'},
  {name: 'Giầy tây', value: 'Giầy tây'},
];

const AddShoe = () => {
  const [data, setData] = useSetObjectState({
    shoeId: 'ABC139823A4',
    imageUri: '',
    type: 'Hunter',
  });

  const onActionShoe = async () => {
    const response = await updateShoes(data);
    console.log(response);
  };

  const formIsValid = () => {
    return true;
  };

  return (
    <Block flex={1} bg="bg">
      <ScrollView>
        <ImagePicker imageUri={data.imageUri} setData={setData} />

        <Block p="20px">
          <Input
            label="Mã giầy"
            required
            placeholder="Nhập mã giầy"
            value={data.shoeId}
            onChange={(val: string) => setData({shoeId: val})}
          />
          <Picker
            label="Dòng sản phẩm"
            title="Dòng sản phẩm"
            options={GATEGORIES}
            placeholder="Chọn dòng sản phẩm"
            value={data.type}
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
        disabled={!formIsValid()}
        onPress={onActionShoe}>
        <Text color={!formIsValid() ? theme.color.gray : theme.color.secondary}>
          Thêm sản phẩm
        </Text>
      </Button>
    </Block>
  );
};

export default AddShoe;
