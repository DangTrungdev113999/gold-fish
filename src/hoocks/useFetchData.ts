import { addSuggestionLoadingSelector } from './../modules/User/selectors';
/* eslint-disable react-hooks/exhaustive-deps */
//@ts-nocheck
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductTypesLoadingSelector,
  shoeTypesSelector,
} from '~/modules/Settings/selectors';
import { fetchProductTypesCreator } from '~/modules/Settings/thunk';
import {
  fetchSuggestionLoadingSelector,
  profileSelector,
  shoePrefixesSelector,
} from '~/modules/User/selectors';
import {
  addSuggestionCreator,
  fetchSuggestionCreator,
} from '~/modules/User/thunk';

const useFetchData = () => {
  const dispatch = useDispatch();
  const profile = useSelector(profileSelector);
  const shoeTypesTab = useSelector(shoeTypesSelector);
  const fetchProductsLoading = useSelector(fetchProductTypesLoadingSelector);
  const fetchSuggestionLoading = useSelector(fetchSuggestionLoadingSelector);
  const addSuggestionLoading = useSelector(addSuggestionLoadingSelector);
  const shoePrefixes = useSelector(shoePrefixesSelector);

  useEffect(() => {
    if (!shoeTypesTab.length) {
      dispatch(fetchProductTypesCreator());
    }
  }, [shoeTypesTab]);

  useEffect(() => {
    if (!shoePrefixes.length) {
      dispatch(
        addSuggestionCreator({
          user: profile,
          data: {
            shoePrefixes: [
              { name: 'DSMH', description: 'Giầy street hunter ' },
            ],
            slipperPrefixes: [{ name: 'DEM', description: '' }],
            colorCodes: [
              { name: '-TRG', description: 'Màu trắng' },
              { name: '-DEN', description: 'Màu đen' },
            ],
          },
        }),
      );
    } else {
      dispatch(fetchSuggestionCreator());
    }
  }, []);

  return fetchProductsLoading || fetchSuggestionLoading || addSuggestionLoading;
};

export default useFetchData;
