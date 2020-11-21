//@ts-nocheck
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import styled from 'styled-components';
import { Block, Text } from '~/components';
import theme from '~/config/theme';

const Image = styled.Image.attrs({})`
  width: 200px;
  height: 200px;
`;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: windowHeight / 3,
  },
});

const Swipper = () => {
  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={false}
      width={windowWidth}
      height={windowHeight / 2}
      // loop
      // autoplay
      // autoplayDirection
      autoplayTimeout={4}
      dotColor={theme.color.white}
      activeDotColor={theme.color.secondary}>
      <Block center middle>
        <Image source={require('@assets/images/search.png')} />
        <Text h5 center color={theme.color.white} m="20px 0 0">
          Tra mã giày một cách nhanh chóng
        </Text>
        <Text center color={theme.color.white} m="10px 0 0">
          Hõ chợ cho việc chạy kho
        </Text>
      </Block>
      <Block center middle>
        <Image source={require('@assets/images/shoes.png')} />
        <Text h5 center color={theme.color.white} m="20px 0 0">
          Hõ trợ việc nhớ mã giầy
        </Text>
      </Block>
    </Swiper>
  );
};

export default Swipper;
