import { FlatListProps, FlatList } from "react-native";
import React from "react";

type ScrollableListProps<T> = {
  handleScroll: (event: any) => void;
} & FlatListProps<T>;

const ScrollableList = <T,>({
  handleScroll,
  ...rest
}: ScrollableListProps<T>) => {
  return (
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{ paddingTop: 180, paddingBottom: 100, gap: 8 }}
      onScroll={handleScroll}
      {...rest}
    />
  );
};

export default ScrollableList;
