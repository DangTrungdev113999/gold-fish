/* eslint-disable no-sparse-arrays */
//@ts-nocheck
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';

import Block from '../Block';
import TouchableOpacity from '../Touchable';
import Text from '../Text';
import Icon from '../Icon';
import theme from '~/config/theme';
import { shoeTypes, slipperType } from '~/@types';
import { separatorCode, showAlert } from '~/utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  favouriteShoesSelector,
  favouriteSlippersSelector,
  updateUserLoadingSelector,
} from '~/modules/User/selectors';
import { updateUserCreator } from '~/modules/User/thunk';
import { fetchFavouriteShoesListCreator } from '~/modules/Favourite/thunk';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//@ts-ignore
const Image = styled.Image`
  width: 100%;
  height: 100%;
`;

const EditImage = styled.Image`
  width: 20px;
  height: 20px;
`;

const Wrapper = styled(Block)`
  margin: 6px;
  width: ${windowWidth / 2 - 20}px;
  height: ${windowHeight / 5}px;
  border-radius: 4px;
  overflow: hidden;
  elevation: 3;
`;

type CardPropsType = {
  item: shoeTypes | slipperType;
};

const Card = ({ item, targetScreen }: CardPropsType) => {
  const navigation = useNavigation();
  const [side, setSide] = useState(true);

  const dispatch = useDispatch();
  const favouriteShoes = useSelector(favouriteShoesSelector);
  const favouriteSlippers = useSelector(favouriteSlippersSelector);
  const updateUserLoading = useSelector(updateUserLoadingSelector);
  const [favourite, setFavourite] = useState(
    favouriteShoes.includes(item?.shoeId || item?.slipperId),
  );

  useEffect(() => {
    setFavourite(favouriteShoes.includes(item?.shoeId || item?.slipperId));
  }, [favouriteShoes]);

  const handleFavuorite = () => {
    let alphaData;
    let data;
    if (targetScreen === 'action_shoe_screen') {
      alphaData = [...favouriteShoes];
      if (!favourite) {
        alphaData.unshift(item.shoeId);
        setFavourite(true);
      } else {
        const index = favouriteShoes.indexOf(item.shoeId);
        alphaData.splice(index, 1);
        setFavourite(false);
      }

      data = {
        favouriteShoes: alphaData,
      };
    } else {
      alphaData = [...favouriteSlippers];
      if (!favourite) {
        alphaData.unshift(item.slipperId);
        setFavourite(true);
      } else {
        const index = favouriteSlippers.indexOf(item.shoeId);
        alphaData.splice(index, 1);
        setFavourite(false);
      }

      data = {
        favouriteSlippers: alphaData,
      };
    }
    dispatch(
      updateUserCreator({
        data,
        onSuccess: () => {
          if (favourite) {
            Toast.show(
              `Đã xóa ${
                item?.shoeId || item?.slipperId
              } khỏi đanh sách yêu thích`,
            );
          } else {
            Toast.show(
              `Đã thêm ${
                item?.shoeId || item?.slipperId
              } vào đanh sách yêu thích`,
            );
          }
          if (targetScreen === 'action_shoe_screen') {
            dispatch(
              fetchFavouriteShoesListCreator({
                favouriteShoes: alphaData,
              }),
            );
          }
        },
        onError: (e) => {
          showAlert('Thông báo', e);
        },
      }),
    );
  };

  const onEdit = () => {
    if (targetScreen === 'action_shoe_screen') {
      navigation.navigate('action_shoe_screen', {
        type: 'update',
        shoeDetail: item,
      });
    } else {
      navigation.navigate('action_slipper_screen', {
        type: 'update',
        slipperDetail: item,
      });
    }
  };

  const separatorResult = separatorCode(item?.shoeId || item?.slipperId);

  return (
    <Wrapper>
      {side ? (
        <TouchableOpacity flex={1} onPress={() => setSide(false)}>
          <Image
            rezideMode="cover"
            resizeMethod="resize"
            source={{ uri: item.imageUri }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          flex={1}
          center
          middle
          bg={theme.color.blue3}
          onPress={() => setSide(true)}>
          {separatorResult.prefix ? (
            [
              <Text
                h3
                color={theme.color.secondary}
                bold
                center
                letterSpacing={2}>
                {separatorResult.prefix}
              </Text>,
              <Text h3 color={theme.color.secondary} bold center>
                {separatorResult?.numberic}
              </Text>,
              <Text h3 color={theme.color.secondary} bold center>
                {separatorResult?.colorCode || ''}
              </Text>,
              ,
            ]
          ) : (
            <Text h3 color={theme.color.secondary} bold center>
              {item.shoeId}
            </Text>
          )}
        </TouchableOpacity>
      )}

      <Block row h="20%">
        <TouchableOpacity
          flex={1}
          center
          middle
          bg={theme.color.blue1}
          onPress={onEdit}>
          <EditImage source={require('@assets/images/edit.png')} />
          {/* <Icon
            type="antDesign"
            name="edit"
            size={20}
            color={theme.color.secondary}
          /> */}
        </TouchableOpacity>
        <TouchableOpacity
          flex={1}
          center
          middle
          bg={theme.color.blue2}
          disabled={updateUserLoading}
          onPress={handleFavuorite}>
          <Icon
            type="materialIcons"
            name={favourite ? 'favorite' : 'favorite-outline'}
            size={20}
            color={theme.color.secondary}
          />
        </TouchableOpacity>
      </Block>
    </Wrapper>
  );
};

export default Card;
