/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
//@ts-nocheck
import React, { useState, useEffect } from 'react';
import { TabBar, TabView } from 'react-native-tab-view';

import { Body } from '~/components';
import { useDispatch, useSelector } from 'react-redux';
import { SHOE_PREFIX, COLOR_CODE_MAP, TABS_SETTING } from '~/config/constants';
import AddModal from './components/AddModal';
import theme from '~/config/theme';
import ListItem from './components/ListItem';
import { fetchProductTypesCreator } from '~/modules/Settings/thunk';
import {
  fetchProductTypesLoadingSelector,
  shoeTypesSelector,
  slipperTypesSelector,
} from '~/modules/Settings/selectors';
import { Dimensions } from 'react-native';

const shoeTypess = ({ route }) => {
  const [index, setIndex] = useState(0);

  const dispatch = useDispatch();
  const shoeTypes = useSelector(shoeTypesSelector);
  const slipperTypes = useSelector(slipperTypesSelector);
  const fetchProductsLoading = useSelector(fetchProductTypesLoadingSelector);

  useEffect(() => {
    if (!shoeTypess || !slipperTypes) {
      dispatch(fetchProductTypesCreator());
    }
  }, [shoeTypes, slipperTypes]);

  useEffect(() => {
    if (route.params?.targetTab) {
      const tabIndex = TABS_SETTING.indexOf(route.params?.targetTab);
      setIndex(tabIndex !== -1 ? tabIndex : 0);
    }
  }, [route.params?.targetTab]);

  const listItemMap = () => {
    switch (TABS_SETTING[index]) {
      case 'Loại giày':
        return shoeTypes;
      case 'Loại dép':
        return slipperTypes;
      case 'Tiền tố mã giày':
        return SHOE_PREFIX;
      case 'Tiền tố mã dép':
        return SHOE_PREFIX;
      case 'Mã màu':
        return COLOR_CODE_MAP;
      default:
        return [];
    }
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case TABS_SETTING[index]:
        const items = listItemMap();
        return <ListItem items={items} target={TABS_SETTING[index]} />;
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
          routes: TABS_SETTING.map((item) => ({
            key: item,
            title: item,
          })),
        }}
        lazy
        swipeVelocityImpact={0.3}
        swipeEnabled
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
      <AddModal items={listItemMap()} target={TABS_SETTING[index]} />
    </Body>
  );
};

export default shoeTypess;
