/* eslint-disable react-hooks/exhaustive-deps */
//@ts-nocheck
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Block, Body, Card, List, Loading } from '~/components';
import {
  fetchShoesLoadingSelector,
  lastShoeSelector,
  loadMoreShoesLoadingSelector,
  shoesListSelector,
} from '~/modules/Shoes/selector';
import { fetchShoesCreator, loadMoreShoesCreator } from '~/modules/Shoes/thunk';

type PropsType = {
  type: string;
};

const ShoesList = ({ type }: PropsType) => {
  const shoesList = useSelector(shoesListSelector);
  const fetchShoesLoading = useSelector(fetchShoesLoadingSelector);
  const loadMoreShoesLoading = useSelector(loadMoreShoesLoadingSelector);
  const lastShoe = useSelector(lastShoeSelector);
  const dispatch = useDispatch();

  const fetchShoesList = () => {
    dispatch(fetchShoesCreator({ type }));
  };

  useEffect(() => {
    fetchShoesList();
  }, [type]);

  const loadMoreShoesList = () => {
    dispatch(loadMoreShoesCreator());
  };

  return (
    <Body flex={1} center p="10px 0 0">
      <List
        items={shoesList}
        renderItem={({ item }) => (
          <Card item={item} targetScreen="action_shoe_screen" />
        )}
        keyExtractor={(item) => item.shoeId}
        loading={fetchShoesLoading}
        onRefresh={fetchShoesList}
        horizontal={false}
        numColumns={2}
        initialNumToRender={8}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => {
          if (loadMoreShoesLoading) {
            return (
              <Block center p="20px 0 40px">
                <Loading />
              </Block>
            );
          }
          return null;
        }}
        onEndReached={() => {
          if (lastShoe && !loadMoreShoesLoading && type === 'All') {
            loadMoreShoesList();
          }
        }}
      />
    </Body>
  );
};

export default ShoesList;
