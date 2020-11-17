/* eslint-disable react-hooks/exhaustive-deps */
//@ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { DraxProvider, DraxList } from 'react-native-drax';
import Toast from 'react-native-simple-toast';
import { Block, Body, Text, Touchable, Icon } from '~/components';
import theme from '~/config/theme';
import { updateProductTypesCreator } from '~/modules/Settings/thunk';
import { showAlert } from '~/utils';
import { updateSuggestionCreator } from '~/modules/User/thunk';
import { profileSelector } from '~/modules/User/selectors';

const windowWidth = Dimensions.get('window').width;

const ListItem = ({ items = [], target = 'Loại giày' }) => {
  const [alphaData, setAlphaData] = useState(items);
  const [activeIcon, setActiveIcon] = useState(false);
  const dispatch = useDispatch();
  const profile = useSelector(profileSelector);
  const isDelete = useRef(false);

  useEffect(() => {
    setAlphaData(items);
  }, [items]);

  const onUpdateIndex = (data: any) => {
    if (['Loại giày', 'Loại dép'].includes(target)) {
      dispatch(
        updateProductTypesCreator({
          data,
          target,
          onSuccess: () => {
            if (isDelete.current) {
              Toast.show('Xóa danh mục thành công !');
            } else {
              Toast.show('Cập nhật vị trí thành công !');
            }
          },
          onError: (e) => {
            showAlert('Thông báo!', e);
            setAlphaData(items);
          },
        }),
      );
    }

    if (['Tiền tố mã giày', 'Tiền tố mã dép', 'Mã màu'].includes(target)) {
      const suggestionMap = {
        'Tiền tố mã giày': 'shoePrefixes',
        'Tiền tố mã dép': 'slipperPrefixes',
        'Mã màu': 'colorCodes',
      };
      console.log(suggestionMap[target]);
      dispatch(
        updateSuggestionCreator({
          user: profile,
          data: {
            [suggestionMap[target]]: data,
          },
          onSuccess: () => {
            if (isDelete.current) {
              Toast.show('Xóa danh mục thành công !');
            } else {
              Toast.show('Cập nhật vị trí thành công !');
            }
          },
          onError: (e) => {
            showAlert('Thông báo', e);
            setAlphaData(items);
          },
        }),
      );
    }
  };

  const onDelete = (index: number) => {
    isDelete.current = true;
    Alert.alert(
      `${alphaData[index].name}`,
      'Bạn có chắc muốn xóa danh mục này ?',
      [
        {
          text: 'OK',
          onPress: () => {
            const newData = [...alphaData];
            newData.splice(index, 1);
            onUpdateIndex(newData);
          },
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <Body flex={1} center>
      <Block row center middle m="20px 0 10px">
        <Icon
          name={
            activeIcon ? 'information-circle' : 'information-circle-outline'
          }
          type="ionicons"
          m="0 10px 0 0"
          size={25}
          color={theme.color.warning}
        />
        <Text color={theme.color.neutral5} center>
          Nhấn giữ để kéo thả - cập nhật vị trí
        </Text>
      </Block>
      <DraxProvider>
        <DraxList
          data={alphaData}
          onItemDragStart={() => {
            setActiveIcon(true);
          }}
          onItemDragEnd={() => {
            setActiveIcon(false);
          }}
          renderItemContent={({ item, index }) => (
            <Block
              w={windowWidth - 40}
              row
              justify="space-around"
              middle
              p="8px 12px"
              m="10px 0"
              bg="blue1"
              borderRadius="15px"
              borderWidth="1px"
              borderColor={theme.color.primaryLight}
              opacity={activeIcon ? 0.8 : 1}>
              <Block flex={1} center>
                <Text h3 color={theme.color.white}>
                  {index + 1}. {item?.name || item}
                </Text>

                {item?.name === 'Tất cả' ? (
                  <Text footnote color={theme.color.warning}>
                    {item?.description || ''}
                  </Text>
                ) : (
                  <Text footnote>
                    {item?.description ? item?.description : ''}
                  </Text>
                )}
              </Block>
              <Touchable m="0 0 0 20px" onPress={() => onDelete(index)}>
                {item?.name !== 'Tất cả' && (
                  <Icon
                    type="antDesign"
                    name="delete"
                    size={25}
                    color={theme.color.danger}
                  />
                )}
              </Touchable>
            </Block>
          )}
          onItemReorder={({ fromIndex, toIndex }) => {
            const newData = alphaData.slice();
            newData.splice(toIndex, 0, newData.splice(fromIndex, 1)[0]);
            isDelete.current = false;
            onUpdateIndex(newData);
          }}
          keyExtractor={(item) => item.name}
        />
      </DraxProvider>
    </Body>
  );
};

export default ListItem;
