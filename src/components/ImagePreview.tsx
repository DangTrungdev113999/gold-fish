//@ts-nocheck
import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';

const windowHeight = Dimensions.get('window').height;

const Image = styled.Image.attrs({
  resizeMode: 'cover',
})`
  flex: 1;
  height: ${windowHeight / 3}px;
  background-color: rgba(0, 0, 0, 0.8);
`;

const ImagePreview = ({ imageUri }: any) => {
  return (
    <>
      <Image source={{ uri: imageUri }} />
    </>
  );
};

export default ImagePreview;
