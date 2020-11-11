//@ts-nocheck
import React from 'react';
import { Block, Touchable, Text, List } from '~/components';
import { COLOR_CODE_MAP } from '~/config/constants';
import theme from '~/config/theme';

type PropsType = {
  items: string[];
  setString: any;
};

const HideOption = ({ items, setString }: PropsType) => {
  return (
    <Block p="5px 0 10px 15px" bg="bg">
      <List
        items={items}
        horizontal
        renderItem={({ item }: { item: string }) => (
          <Touchable
            onPress={() => setString(item)}
            m="0 10px 0 0"
            p="3px 10px"
            bg={COLOR_CODE_MAP[item] || '#24364E'}
            borderRadius="10px">
            <Text
              color={
                COLOR_CODE_MAP[item] === '#F9F9F9'
                  ? '#000'
                  : theme.color.neutral2
              }>
              {item}
            </Text>
          </Touchable>
        )}
        keyExtractor={(item) => item}
      />
    </Block>
  );
};

export default HideOption;
