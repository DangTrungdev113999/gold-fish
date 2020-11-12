//@ts-nocheck
import * as React from 'react';
import { Dimensions } from 'react-native';

import { DraxProvider, DraxList } from 'react-native-drax';
import { Block, Body, Text, Touchable, Icon } from '~/components';
import theme from '~/config/theme';
const windowWidth = Dimensions.get('window').width;

const ListItem = ({ items = [], target = 'Loại giày' }) => {
  const [alphaData, setAlphaData] = React.useState(items);
  return (
    <Body flex={1} center>
      <Block row center middle m="20px 0 10px">
        <Icon
          name="warning"
          type="antDesign"
          m="0 20px 0 0"
          color={theme.color.warning}
        />
        <Text color={theme.color.neutral5} center>
          Nhấn giữ để kéo thả - cập nhật vị trí
        </Text>
      </Block>
      <DraxProvider>
        <DraxList
          data={alphaData}
          renderItemContent={({ item, index }) => (
            <Block
              w={windowWidth - 40}
              row
              justify="space-around"
              middle
              p="20px"
              m="10px 0"
              bg="blue1"
              borderRadius="15px"
              borderWidth="1px"
              borderColor={theme.color.primaryLight}>
              <Block flex={1}>
                <Text h3 color={theme.color.white}>
                  {index + 1}. {item?.name || item}
                </Text>
                <Text footnote>test</Text>
              </Block>
              <Touchable m="0 0 0 20px">
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
            setAlphaData(newData);
          }}
          keyExtractor={(item) => item.name}
        />
      </DraxProvider>
    </Body>
  );
};

export default ListItem;
