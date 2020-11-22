//@ts-nocheck
import React from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components';
import Loading from './Loading';
import Text from './Text';

import theme from '~/config/theme';

const Wrapper = styled.View`
  background-color: rgba(0, 0, 0, 0.4);
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LoadingOverlay = ({ loading, title, ...rest }) => (
  <Modal animationType="fade" transparent visible={loading} {...rest}>
    <Wrapper>
      <Loading />
      <Text color={theme.color.secondary2} h5>
        {title}
      </Text>
    </Wrapper>
  </Modal>
);

export default LoadingOverlay;
