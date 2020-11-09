import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import { shoeType } from '~/@types';

import {
  Card,
  Body,
  Loading,
  Touchable,
  Icon,
  Text,
  Block,
  Input,
} from '~/components';
import theme from '~/config/theme';

const windowHeight = Dimensions.get('window').height;

const Container = styled(Touchable)`
  margin-top: 20px;
  padding: 0 20px 20px;
  border-bottom-width: 0.5px;
  border-bottom-color: #314a6e;
  overflow: hidden;
`;

//@ts-ignore
const Image = styled.Image.attrs({
  resizeMode: 'contain',
})`
  flex: 1;
  width: 100%;
  height: 100px;
  border-radius: 5px;
  background-color: transparent;
`;

type PropsType = {
  item: shoeType;
};
const Option = ({ item }: any) => {
  return (
    <Container block h="100px" row middle>
      <Text h5 color={theme.color.neutral2} flex={1}>
        {item.shoeId}
      </Text>
      <Image
        resizeMethod="resize"
        source={{
          uri: item.imageUri,
        }}
      />
    </Container>
  );
};

export default Option;
