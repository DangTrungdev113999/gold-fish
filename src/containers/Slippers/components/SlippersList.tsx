/* eslint-disable react-hooks/exhaustive-deps */
//@ts-nocheck
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Block, Body, Card, List, Loading } from '~/components';
import {
  fetchSlippersLoadingSelector,
  lastSlipperSelector,
  loadMoreSlippersLoadingSelector,
  slippersListSelector,
} from '~/modules/Slippers/selectors/';
import {
  fetchSlippersCreator,
  loadMoreSlippersCreator,
} from '~/modules/Slippers/thunk';

type PropsType = {
  type: string;
};

const SlippersList = ({ type }: PropsType) => {
  const slippersList = useSelector(slippersListSelector);
  const fetchSlippersLoading = useSelector(fetchSlippersLoadingSelector);
  const loadMoreSlippersLoading = useSelector(loadMoreSlippersLoadingSelector);
  const lastSlipper = useSelector(lastSlipperSelector);
  const dispatch = useDispatch();

  const fetchSlippersList = () => {
    dispatch(fetchSlippersCreator({ type }));
  };

  useEffect(() => {
    fetchSlippersList();
  }, [type]);

  const loadMoreSlippersList = () => {
    dispatch(loadMoreSlippersCreator());
  };

  return (
    <Body flex={1} center p="10px 0 0">
      <List
        items={slippersList}
        renderItem={({ item }) => (
          <Card item={item} targetScreen="action_slipper_screen" />
        )}
        keyExtractor={(item) => item.slipperId}
        loading={fetchSlippersLoading}
        onRefresh={fetchSlippersList}
        horizontal={false}
        numColumns={2}
        initialNumToRender={8}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => {
          if (loadMoreSlippersLoading) {
            return (
              <Block center p="20px 0 40px">
                <Loading />
              </Block>
            );
          }
          return null;
        }}
        onEndReached={() => {
          if (
            lastSlipper?.slipperId &&
            !loadMoreSlippersLoading &&
            type === 'All'
          ) {
            loadMoreSlippersList();
          }
        }}
      />
    </Body>
  );
};

export default SlippersList;
