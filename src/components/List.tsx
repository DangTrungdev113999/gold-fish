//@ts-nocheck
import React, { forwardRef } from 'react';
import { RefreshControl, FlatList, ScrollView } from 'react-native';
import { Block, Text } from '~/components';
import theme from '~/config/theme';

const List = (
  {
    m,
    loading,
    onRefresh,
    keyExtractor,
    renderItem,
    items,
    error,
    ...rest
  }: any,
  ref,
) => {
  return (
    <Block m={m}>
      {!items || items.length === 0 ? (
        <Block
          ref={ref}
          refreshControl={
            onRefresh ? (
              <RefreshControl refreshing={loading} onRefresh={onRefresh} />
            ) : null
          }
          style={{ backgroundColor: theme.color.bg }}>
          <Block center middle>
            <Text color="disabled" center>
              {loading ? 'Đang lấy dữ liệu...' : error || 'Không có dữ liệu.'}
            </Text>
          </Block>
        </Block>
      ) : (
        <FlatList
          ref={ref}
          refreshControl={
            onRefresh ? (
              <RefreshControl refreshing={loading} onRefresh={onRefresh} />
            ) : null
          }
          data={items}
          keyExtractor={
            keyExtractor || ((item, index) => `${item.id || index}`)
          }
          renderItem={renderItem}
          {...rest}
        />
      )}
    </Block>
  );
};

export default forwardRef(List);
