import React, {Fragment} from 'react';
import styled from 'styled-components';
import {Keyboard, Platform, TouchableWithoutFeedback} from 'react-native';

import LoadingOverlay from './LoadingOverlay';

import theme from '~/config/theme';

const View = styled.View`
  ${({flex}) => flex && `flex: ${flex};`}
  background-color: ${({bg}) => {
    if (bg) {
      return bg;
    }
    return theme.color.bg;
  }}
    ${({center}) =>
    center &&
    `
      align-items: center;
      justify-content: center;
  `}
    ${({p}) => p && `padding: ${p};`}
`;

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  ${({flex}) => flex && `flex: ${flex};`}
  background-color: ${({bg}) => {
    if (bg) {
      return bg;
    }
    return theme.color.white;
  }};
  ${({center}) =>
    center &&
    `
    align-items: center;
    justify-content: center;
  `}
  ${({p}) => p && `padding: ${p};`}
`;

const Body = ({
  children,
  keybordAvoid,
  overlay,
  loading,
  loadingLabel,
  ...rest
}) => {
  let view = <View {...rest}>{children}</View>;
  if (keybordAvoid) {
    view = (
      <TouchableWithouteedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={60}
          {...rest}>
          {children}
        </KeyboardAvoidingView>
      </TouchableWithouteedback>
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
