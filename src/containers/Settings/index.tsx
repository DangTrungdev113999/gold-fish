/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
//@ts-nocheck
import React, { useState, useEffect } from 'react';
import { TabBar, TabView } from 'react-native-tab-view';

import { Block, Body, Text, Touchable, Icon } from '~/components';
import { useDispatch, useSelector } from 'react-redux';
import { SHOE_PREFIX, COLOR_CODE_MAP } from '~/config/constants';
import AddModal from './components/AddModal';
import theme from '~/config/theme';
import ListItem from './components/ListItem';
import { fetchProductTypesCreator } from '~/modules/Settings/thunk';
import {
  fetchProductTypesLoadingSelector,
  shoeTypesSelector,
  slipperTypesSelector,
} from '~/modules/Settings/selectors';

const TABS = [
  'Loại giày',
  'loại dép',
  'Tiền tố mã giày',
  'Tiền tố mã dép',
  'Mã mầu',
];

const shoeTypess = () => {
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

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'Loại giày':
        return <ListItem items={shoeTypes} target={TABS[index]} />;
      case 'loại dép':
        return <ListItem items={slipperTypes} target={TABS[index]} />;
      case 'Tiền tố mã giày':
        return <ListItem items={SHOE_PREFIX} target={TABS[index]} />;
      case 'Tiền tố mã dép':
        return <ListItem items={SHOE_PREFIX} target={TABS[index]} />;
      case 'Mã mầu':
        return <ListItem items={COLOR_CODE_MAP} target={TABS[index]} />;
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
              fontSize: 15,
              margin: 0,
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
          routes: TABS.map((item) => ({
            key: item,
            title: item,
          })),
        }}
        lazy
        swipeVelocityImpact={0.3}
        swipeEnabled
        renderScene={renderScene}
        onIndexChange={setIndex}
      />
      <AddModal target={TABS[index]} />
    </Body>
  );
};

export default shoeTypess;
