//@ts-nocheck

import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { KeyboardAvoidingView, Platform } from 'react-native';

import LoadingOverlay from './LoadingOverlay';
import theme from '~/config/theme';

const ScrollView = styled.ScrollView.attrs(({ p, flex }) => {
  const result = {};
  if (p) {
    result.contentContainerStyle = {
      padding: p,
    };
  }
  if (flex) {
    result.contentContainerStyle = {
      flex,
    };
  }
  return result;
})`
  background-color: ${({ bg }) => {
    if (bg) {
      return bg;
    }
    return theme.color.bg;
  }};
`;

const ScrollBody = (
  { children, keyboard, loading, loadingLabel, overlay, ...rest },
  ref,
) => {
  // const headerHeight = useHeaderHeight();

  let scrollview = (
    <ScrollView
      ref={ref}
      keyboardDismissMode="interactive"
      keyboardShouldPersistTaps="handled"
      {...rest}>
      {children}
    </ScrollView>
  );

  if (keyboard) {
    scrollview = (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // keyboardVerticalOffset={headerHeight}
      >
        {scrollview}
      </KeyboardAvoidingView>
    );
  }

  if (overlay) {
    return (
      <>
        {scrollview}
        <LoadingOverlay
          loading={!!loading}
          title={loadingLabel || 'Đang tải...'}
        />
      </>
    );
  }

  return scrollview;
};

export default forwardRef(ScrollBody);
