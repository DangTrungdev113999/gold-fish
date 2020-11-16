//@ts-nocheck
import React, { useState } from 'react';
import styled from 'styled-components';
import Text from './Text';
import Loading from './Loading';
import Icon from './Icon';

import theme from '~/config/theme';

const Wrapper = styled.View`
  ${({ m }) => m && `margin: ${m};`}
`;

const WrapperInput = styled.View.attrs(({ focus }) =>
  focus
    ? {
        shadowColor: theme.color.secondary,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
      }
    : {},
)`
  flex-direction: row;
  align-items: center;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  background-color: white;
  height: 40px;
  ${({ danger }) => danger && `border-color: ${theme.color.danger};`}
  ${({ success }) => success && `border-color: ${theme.color.success};`}
  ${({ disabled }) => disabled && `background-color: ${theme.color.neutral5};`}
  ${({ m }) => m && `margin: ${m};`}
`;

//@ts-ignore
const StyledTextInput = styled.TextInput.attrs({
  placeholderTextColor: theme.color.neutral6,
  underlineColorAndroid: 'transparent',
  fontFamily: theme.font.primary,
  fontSize: 15,
})`
  flex: 1;
  height: 40px;
  padding: 0 12px;
  font-family: ${theme.font.primary};
  color: ${theme.color.textSecondary};
  ${({ m }) => m && `margin: ${m};`}
`;

const TextInput = React.forwardRef(
  (
    {
      m,
      label,
      required,
      description,
      disabled,
      loading,
      iconLeftName,
      iconLeftType,
      iconRight,
      iconRightOnPress,
      type,
      danger,
      success,
      onFocus,
      onBlur,
      style,
      ...rest
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [focus, setFocus] = useState(false);

    const wrapperInputProps = {
      disabled,
      danger,
      success,
      focus,
      style,
    };

    const inputProps = {
      ref,
      editable: !disabled,
      secureTextEntry: type === 'password' && !showPassword,
      onFocus: () => {
        setFocus(true);
        onFocus && onFocus();
      },
      onBlur: () => {
        setFocus(false);
        onBlur && onBlur();
      },
      ...rest,
    };

    const footnoteProps = {
      m: '2px 0 0',
      footnote: true,
    };

    if (danger) {
      iconRight = 'error-outline';
      footnoteProps.color = theme.color.danger;
    }

    if (success) {
      iconRight = 'check-success';
      footnoteProps.color = theme.color.success;
    }

    if (
      label ||
      iconLeftName ||
      iconRight ||
      type === 'password' ||
      description ||
      loading
    ) {
      if (type === 'password') {
        if (showPassword) {
          iconRight = 'eye';
        } else {
          iconRight = 'eye-fill';
        }
      }

      return (
        <Wrapper m={m} focus={focus}>
          {label ? (
            <Text s2 m="0 0 5px">
              {label}
              {required ? (
                <Text s2 color="danger">
                  *
                </Text>
              ) : null}
            </Text>
          ) : null}

          <WrapperInput {...wrapperInputProps}>
            {iconLeftName ? (
              <Icon
                name={iconLeftName}
                type={iconLeftType}
                size={18}
                m="0 0 0 10px"
              />
            ) : null}

            <StyledTextInput {...inputProps} />

            {iconRight ? (
              <Icon
                name={iconRight}
                type="materialIcons"
                size={18}
                m="0 10px 0 0"
                color={danger ? theme.color.danger : '#000'}
              />
            ) : null}

            {loading ? <Loading color="primary" m="0 10px 0 0" /> : null}
          </WrapperInput>

          {description ? <Text {...footnoteProps}>{description}</Text> : null}
        </Wrapper>
      );
    }

    return (
      <WrapperInput m={m} {...wrapperInputProps}>
        <StyledTextInput {...inputProps} />
      </WrapperInput>
    );
  },
);

export default TextInput;
