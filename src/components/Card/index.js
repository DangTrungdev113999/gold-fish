import React, {useState} from 'react';
import styled from 'styled-components';
import {Dimensions} from 'react-native';
import FlipCard from 'react-native-flip-card';

import Block from '../Block';
import TouchableOpacity from '../Touchable';
import Text from '../Text';
import Icon from '../Icon';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

const ImageBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled(Block)`
  /* elevation: 3; */
  margin: 10px;
`;

const Card = ({item}) => {
  console.log(item);
  const [favorite, setFavorite] = useState(false);

  const handleFavorite = () => setFavorite(!favorite);

  return (
    <Wrapper
      w={`${windowWidth / 2 - 30}px`}
      h={`${windowHeight / 5}px`}
      block
      // borderWidth="1px"
      borderRadius="15px"
      overflow="hidden">
      <FlipCard friction={60} perspective={10000} flipVertical={true}>
        {/* Face Side */}

        <Block>
          <Image rezideMode="cover" source={{uri: item.img}} />
        </Block>

        {/* Back Side */}

        <Block block>
          <ImageBackground
            source={{uri: item.img}}
            resizeMode="cover"
            blurRadius={20}>
            <Block flex={1} row center middle>
              <Text h3 color="#FFAB00" bold>
                {item.id}
              </Text>
            </Block>
          </ImageBackground>
        </Block>
      </FlipCard>

      <Block row h="20%">
        <TouchableOpacity flex={1} center middle bg="#FFAB00">
          <Icon type="antDesign" name="edit" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          flex={1}
          center
          middle
          bg="#36B37E"
          onPress={handleFavorite}>
          <Icon
            type="maturialIcons"
            name={favorite ? 'favorite' : 'favorite-outline'}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
      </Block>
    </Wrapper>
  );
};

export default Card;
