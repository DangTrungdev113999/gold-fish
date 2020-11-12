/* eslint-disable react-hooks/exhaustive-deps */
//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { TabBar, TabView } from 'react-native-tab-view';
import { useDispatch, useSelector } from 'react-redux';
import { Body, SearchModal } from '~/components';
import theme from '~/config/theme';
import {
  fetchProductTypesLoadingSelector,
  shoeTypesSelector,
} from '~/modules/Settings/selectors';
import { fetchProductTypesCreator } from '~/modules/Settings/thunk';
import ShoesList from './components/ShoesList';

const Shoes = () => {
  const [index, setIndex] = useState(0);

  const dispatch = useDispatch();
  const shoeTypesTab = useSelector(shoeTypesSelector);
  const fetchProductsLoading = useSelector(fetchProductTypesLoadingSelector);

  useEffect(() => {
    if (!shoeTypesTab.length) {
      dispatch(fetchProductTypesCreator());
    }
  }, [shoeTypesTab]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case shoeTypesTab[index].name:
        return <ShoesList type={shoeTypesTab[index].name} />;
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
        // initialLayout={{ width: Dimensions.get('window').width }}
      />

      <SearchModal productTarget="shoe" />
    </Body>
  );
};

export default Shoes;
