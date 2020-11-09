import React, { PureComponent } from 'react';
import { Dimensions, Keyboard, Platform } from 'react-native';
import styled from 'styled-components';
import Modal from 'react-native-modal';

import Text from '../Text';
import Icon from '../Icon';
import Loading from '../Loading';
import Option from './Option';

import theme from '~/config/theme';
const Container = styled.View`
  flex: 1;
  ${({ m }: any) => m && `margin: ${m};`}
  ${({ p }: any) => p && `padding: ${p};`}
`;

const Input = styled.TouchableOpacity`
  height: 40px;
  padding-horizontal: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 3px;
  border: 1px solid #f6f5f5;
  ${({ disabled }: any) =>
    disabled && `background-color: ${theme.color.neutral2};`}
`;

const Wrapper = styled.View`
  background-color: white;
  border-radius: 3px;
  padding-bottom: 10px;
`;

const FlatList = styled.FlatList`
  margin-top: 20px;
  max-height: ${Dimensions.get('window').height - 300}px;
`;

function arrayToObject(arr: any, key: any) {
  return arr.reduce((a: any, b: any) => {
    const r = { ...a };
    r[b[key]] = b;
    return r;
  }, {});
}

class Picker extends PureComponent {
  state = {
    visible: false,
  };

  onOpen = () => {
    if (Platform.OS === 'ios') {
      Keyboard.dismiss();
      setTimeout(() => this.setState({ visible: true }), 100);
    } else {
      this.setState({ visible: true });
    }
  };

  onClose = () => {
    this.setState({ visible: false });
  };

  onOptionPress = (option: any) => {
    this.props.onChange(option.value);
    this.onClose();
  };

  render() {
    const {
      m,
      label,
      required,
      placeholder,
      title,
      options,
      value,
      type = 'nomal',
      loading,
      ...rest
    }: any = this.props;
    const { visible } = this.state;
    const optionsObject = arrayToObject(options, 'value');

    return (
      <Container m={m}>
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

        {type === 'nomal' && (
          <Input onPress={this.onOpen} disabled={loading} {...rest}>
            <Text flex={1} color={!value ? theme.color.textNeutral : null}>
              {optionsObject[value]
                ? optionsObject[value].name
                : value || placeholder}
            </Text>
            {loading ? (
              <Loading color="primary" m="0 10px 0 0" />
            ) : (
              <Icon name="chevron-down" type="feather" />
            )}
          </Input>
        )}
        <Modal
          isVisible={visible}
          onBackdropPress={this.onClose}
          onBackButtonPress={this.onClose}
          backdropColor={theme.color.neutral9}
          backdropOpacity={0.6}
          style={{ marginHorizontal: 39 }}>
          <Wrapper>
            {title ? (
              <Text h3 medium color="primary" m="20px 0 0" center>
                {title}
              </Text>
            ) : null}
            <FlatList
              data={options}
              keyExtractor={(item: any) => item.value}
              renderItem={({ item }: any) => (
                <Option
                  item={item}
                  active={item.value === value}
                  onPress={this.onOptionPress}
                />
              )}
            />
          </Wrapper>
        </Modal>
      </Container>
    );
  }
}

export default Picker;
