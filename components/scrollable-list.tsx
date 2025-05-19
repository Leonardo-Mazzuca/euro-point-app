import { FlatListProps, FlatList } from "react-native";
import React from "react";

type ScrollableListProps<T> = {
  handleScroll: (event: any) => void;
  paddingTop?:number
} & FlatListProps<T>;

const ScrollableList = <T,>({
  handleScroll,
  className,
  paddingTop,
  ...rest
}: ScrollableListProps<T>) => {
  return (
    <FlatList 
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{ paddingTop:180, paddingBottom: 100, gap: 8, ...(rest.contentContainerStyle as object) }}
      onScroll={handleScroll}
      {...rest}
    />
  );
};

export default ScrollableList;
