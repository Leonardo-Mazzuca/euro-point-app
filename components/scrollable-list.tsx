import { FlatListProps, FlatList } from "react-native";
import React from "react";
import { cn } from "@/lib/utils";

type ScrollableListProps<T> = {
  handleScroll: (event: any) => void;
} & FlatListProps<T>;

const ScrollableList = <T,>({
  handleScroll,
  className,
  ...rest
}: ScrollableListProps<T>) => {
  return (
    <FlatList
      className={cn("mt-10", className)} //"mt-10"
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{ paddingTop: 180, paddingBottom: 100, gap: 8}}
      onScroll={handleScroll}
      {...rest}
    />
  );
};

export default ScrollableList;
