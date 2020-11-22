/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
//@ts-nocheck
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Block, Body, Card, List, Loading } from '~/components';
import {
  favouriteShoesListSelector,
  fetchFavouriteShoesListLoaingSelector,
} from '~/modules/Favourite/selectors';
import { fetchFavouriteShoesListCreator } from '~/modules/Favourite/thunk';
import { favouriteShoesSelector } from '~/modules/User/selectors';

const FavouriteShoes = () => {
  const dispatch = useDispatch();
  const favouriteShoes = useSelector(favouriteShoesSelector);
  const favouriteShoesList = useSelector(favouriteShoesListSelector);
  const fetchFavouriteShoesListLoading = useSelector(
    fetchFavouriteShoesListLoaingSelector,
  );

  const fetchFavouriteShoes = () => {
    dispatch(
      fetchFavouriteShoesListCreator({
        favouriteShoes,
      }),
    );
  };

  useState(() => {
    fetchFavouriteShoes();
  }, [favouriteShoes]);

  return (
    <Body flex={1} center p="10px 0 0">
      <List
        items={favouriteShoesList}
        renderItem={({ item }) => (
          <Card item={item} targetScreen="action_shoe_screen" />
        )}
        keyExtractor={(item) => item.shoeId}
        // loading={fetchFavouriteShoesListLoading}
        // onRefresh={fetchFavouriteShoes}
        horizontal={false}
        numColumns={2}
        initialNumToRender={8}
        onEndReachedThreshold={0.1}
      />
    </Body>
  );
};

export default FavouriteShoes;
