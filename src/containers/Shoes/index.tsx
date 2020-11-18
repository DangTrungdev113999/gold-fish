/* eslint-disable react-hooks/exhaustive-deps */
//@ts-nocheck
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import { Body, SearchModal } from '~/components';
import theme from '~/config/theme';
import { useAuthentication, useFetchData } from '~/hoocks';
import { shoeTypesSelector } from '~/modules/Settings/selectors';
import ShoesList from './components/ShoesList';

const Shoes = () => {
  useAuthentication();
  const loading = useFetchData();
  const [index, setIndex] = useState(0);

  const shoeTypesTab = useSelector(shoeTypesSelector);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case shoeTypesTab[index].name:
        return <ShoesList type={shoeTypesTab[index].name} />;
      default:
        return null;
    }
  };

  return (
    <Body flex={1} overlay loading={loading}>
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
              fontSize: 13,
              margin: 0,
              height: 28,
            }}
            tabStyle={{
              height: 38,
            }}
            indicatorStyle={{
              backgroundColor: theme.color.secondary,
            }}
            style={{
              backgroundColor: theme.color.blue3,
            }}
          />
        )}
        navigationState={{
          index,
          routes: shoeTypesTab.map((item) => ({
            key: item.name,
            title: item.name,
          })),
        }}
        lazy
        swipeVelocityImpact={0.3}
        swipeEnabled
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
      />

      <SearchModal productTarget="shoe" />
    </Body>
  );
};

export default Shoes;
