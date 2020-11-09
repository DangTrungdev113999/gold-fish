import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';

import LoadingOverlay from './LoadingOverlay';

import theme from '~/config/theme';

//@ts-ignore
const View = styled.View`
  ${({ flex }: any) => flex && `flex: ${flex};`}
  background-color: ${({ bg }: any) => {
    if (bg) {
      return bg;
    }
    return theme.color.bg;
  }}
    ${({ center }: any) =>
    center &&
    `
      align-items: center;
      justify-content: center;
  `}
    ${({ p }: any) => p && `padding: ${p};`}
`;

//@ts-ignore
const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  ${({ flex }: any) => flex && `flex: ${flex};`}
  background-color: ${({ bg }: any) => {
    if (bg) {
      return bg;
    }
    return theme.color.white;
  }};
  ${({ center }: any) =>
    center &&
    `
    align-items: center;
    justify-content: center;
  `}
  ${({ p }: any) => p && `padding: ${p};`}
`;

const Body = ({
  children,
  keybordAvoid,
  overlay,
  loading,
  loadingLabel,
  ...rest
}: any) => {
  let view = <View {...rest}>{children}</View>;
  if (keybordAvoid) {
    view = (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={60}
          {...rest}>
          {children}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }

  if (overlay) {
    return (
      <Fragment>
        {view}
        <LoadingOverlay
          loading={!!loading}
          title={loadingLabel ? loadingLabel : 'Loading...'}
        />
      </Fragment>
    );
  }

  return view;
};

export default Body;
