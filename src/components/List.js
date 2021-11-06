import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import theme from './../theme';

const List = ({
  data,
  renderItem,
  isRefreshing,
  onRefresing,
  isLoadingMore,
  loadMore,
  inverted,
  style,
  refresh = true,
}) => {
  return (
    <FlatList
      style={[styles.list, style]}
      inverted={inverted}
      data={data}
      renderItem={renderItem}
      refreshing={isRefreshing}
      onRefresh={onRefresing}
      refreshControl={
        refresh && (
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresing}
            colors={[theme.colors.refreshColor]}
          />
        )
      }
      keyExtractor={(_, index) => index.toString()}
      ListFooterComponent={() => (isLoadingMore ? <ActivityIndicator /> : null)}
      onEndReachedThreshold={0.4}
      onEndReached={loadMore}
    />
  );
};

export default List;

const styles = StyleSheet.create({
  list: {
    paddingTop: 10 * theme.consts.BW,
  },
});
