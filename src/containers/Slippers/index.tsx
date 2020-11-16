/* eslint-disable react-hooks/exhaustive-deps */
//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import { useDispatch, useSelector } from 'react-redux';
import { Body, SearchModal } from '~/components';
import theme from '~/config/theme';
import useAuthencation from '~/hoocks/useAuthentication';
import {
  fetchProductTypesLoadingSelector,
  slipperTypesSelector,
} from '~/modules/Settings/selectors';
import { fetchProductTypesCreator } from '~/modules/Settings/thunk';
import SlippersList from './components/SlippersList';

const Slippers = () => {
  useAuthencation();
  const [index, setIndex] = React.useState(0);
  const slipperTypesTab = useSelector(slipperTypesSelector);

  const dispatch = useDispatch();
  const fetchProductsLoading = useSelector(fetchProductTypesLoadingSelector);

  useEffect(() => {
    if (!slipperTypesTab.length) {
      dispatch(fetchProductTypesCreator());
    }
  }, [slipperTypesTab]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case slipperTypesTab[index].name:
        return <SlippersList type={slipperTypesTab[index].name} />;
      default:
        return null;
    }
  };

  return (
    <Body flex={1} overlay loading={fetchProductsLoading}>
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
          routes: slipperTypesTab.map((item) => ({
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

      <SearchModal productTarget="slipper" />
    </Body>
  );
};

export default Slippers;
