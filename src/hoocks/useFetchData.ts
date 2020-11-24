import {
  fetchUserLoadingSelector,
  addNewUserLoadingSelector,
} from './../modules/User/selectors';
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
import { fetchUserCreator, addNewUserCreator } from '~/modules/User/thunk';
import { fetchShoesCreator } from '~/modules/Shoes/thunk';
import {
  addSuggestionLoadingSelector,
  ruleUserSelector,
} from '~/modules/User/selectors';
import { defaultSuggestion, defaultUserInfo } from '~/utils/models';

const useFetchData = ({ manual = false } = {}) => {
  const dispatch = useDispatch();
  const profile = useSelector(profileSelector);
  const shoeTypesTab = useSelector(shoeTypesSelector);
  const fetchProductsLoading = useSelector(fetchProductTypesLoadingSelector);
  const fetchSuggestionLoading = useSelector(fetchSuggestionLoadingSelector);
  const addSuggestionLoading = useSelector(addSuggestionLoadingSelector);
  const shoePrefixes = useSelector(shoePrefixesSelector);
  const ruleUser = useSelector(ruleUserSelector);
  const fetchUserLoading = useSelector(fetchUserLoadingSelector);
  const addNewUserLoading = useSelector(addNewUserLoadingSelector);
  useEffect(() => {
    if (!shoeTypesTab.length && !manual) {
      dispatch(fetchProductTypesCreator());
    }
  }, [shoeTypesTab, manual]);

  useEffect(() => {
    if (!manual) {
      if (!ruleUser.length) {
        dispatch(
          addNewUserCreator({
            user: {
              ...defaultUserInfo,
              profile,
            },
          }),
        );
      } else {
        dispatch(fetchUserCreator());
      }
    }
  }, [manual]);

  useEffect(() => {
    if (!manual) {
      if (!shoePrefixes.length) {
        dispatch(
          addSuggestionCreator({
            profile,
            data: defaultSuggestion,
          }),
        );
      } else {
        dispatch(fetchSuggestionCreator());
      }
    }
  }, [manual]);

  const fetchData = () => {
    dispatch(fetchUserCreator());
    dispatch(fetchSuggestionCreator());
    dispatch(fetchShoesCreator({ type: 'Tất cả' }));
  };

  return {
    loading:
      fetchSuggestionLoading ||
      addSuggestionLoading ||
      fetchUserLoading ||
      addNewUserLoading,
    fetchProductsLoading,
    fetchData,
  };
};

export default useFetchData;
