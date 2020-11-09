import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Touchable, Icon, Block, Input } from '~/components';
import theme from '~/config/theme';
import Loading from '../Loading';
import Text from '../Text';

type PropsType = {
  items: string[];
  setString: any;
};

const HideOption = ({ items, setString }: PropsType) => {
  return (
    <Block p="5px 0 10px" bg="bg">
      <FlatList
        data={items}
        horizontal
        renderItem={({ item }: { item: string }) => (
          <Touchable
            onPress={() => setString(item)}
            m="0 10px 0 0"
            p="3px 10px"
            bg="#24364E"
            borderRadius="10px">
            <Text color={theme.color.neutral2}>{item}</Text>
          </Touchable>
        )}
        keyExtractor={(item) => item}
      />
    </Block>
  );
};

export default HideOption;
