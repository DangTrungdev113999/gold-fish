/* eslint-disable react-hooks/exhaustive-deps */
//@ts-nocheck
import React from 'react';
import { TabBar, TabView } from 'react-native-tab-view';
import { Body, SearchModal } from '~/components';
import { SHOE_TYPES } from '~/config/constants';
import theme from '~/config/theme';
import ShoesList from './components/ShoesList';

const SHOE_TYPES_TAB = [...SHOE_TYPES];

SHOE_TYPES_TAB.unshift({ name: 'All', value: 'Tất cả' });

const Shoes = () => {
  const [index, setIndex] = React.useState(0);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case SHOE_TYPES_TAB[index].name:
        return <ShoesList type={SHOE_TYPES_TAB[index].name} />;
      default:
        return null;
    }
  };

  return (
    <Body flex={1}>
      <TabView
        renderTabBar={(props) => (
          <TabBar
            {...props}
            scrollEnabled
            bounces
            activeColor={theme.color.secondary}
            inactiveColor={theme.color.neutral6}
            pressColor={theme.color.secondary}
            labelStyle={{
              fontSize: 15,
              margin: 0,
            }}
            indicatorStyle={{
              backgroundColor: theme.color.secondary,
            }}
            style={{
              backgroundColor: theme.color.blue1,
            }}
          />
        )}
        navigationState={{
          index,
          routes: SHOE_TYPES_TAB.map((item) => ({
            key: item.name,
            title: item.value,
          })),
        }}
        lazy
        swipeVelocityImpact={0.3}
        swipeEnabled
        renderScene={renderScene}
        onIndexChange={setIndex}
        // initialLayout={{ width: Dimensions.get('window').width }}
      />

      <SearchModal />
    </Body>
  );
};

export default Shoes;
