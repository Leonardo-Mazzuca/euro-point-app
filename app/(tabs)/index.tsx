import React, { useEffect, useRef, useState } from "react";
import { Animated, Keyboard, RefreshControl, Text, View } from "react-native";
import Header from "@/components/header";
import { Tabs, TabsList, TabsTrigger } from "@/components/Tabs";
import PostCard from "@/components/post-card";
import { cn } from "@/lib/utils";
import TabsContainer from "@/components/tabs-container";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SearchInput from "@/components/search-input";
import ScrollableList from "@/components/scrollable-list";
import { usePosts } from "@/hooks/use-posts";
import Loading from "@/components/loading";
import { useLayoutContext } from "@/context/layout-context";

const Home = () => {
  const [currentScreen, setCurrentScreen] = useState<HomeScreen>("for-you");
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const uiTranslateY = useRef(new Animated.Value(0)).current;
  const { handleScroll } = useScrollAnimation({
    translateValue: uiTranslateY,
  });
  const { currentUser } = useLayoutContext();

  const { posts, isLoading, refetch } = usePosts();



  useEffect(() => {
    let filtered = posts;

    const currentUserFollowings = currentUser?.followed_areas?.map(
      (area) => area.id
    );

    if (currentScreen === "following") {
      filtered = filtered?.filter((post) =>
        currentUserFollowings?.includes(post.area_id)
      );
    }

    if (search.trim() !== "") {
      filtered = filtered?.filter((post) =>
        post.content.toLowerCase().includes(search.toLowerCase())
      );
    }

    setDisplayedPosts(filtered);
  }, [posts, search, currentScreen]);

  useEffect(()=> {
    if (search.trim() === "") {
      Keyboard.dismiss(); 
      return;
    }
  },[search])

  if (isLoading) {
    return <Loading />;
  }

  return (
    <TabsContainer>
      <View
       className="px-3"
      >
        <Tabs
          value={currentScreen}
          onValueChange={(e) => setCurrentScreen(e as HomeScreen)}
        >
          <Header />
          <TabsList className="flex-row w-full my-2">
            <TabsTrigger value="for-you" className="flex-1">
              <Text
                className={cn(
                  "text-xl font-semibold",
                  currentScreen === "for-you"
                    ? "text-blue-500"
                    : "dark:text-white"
                )}
              >
                Para você
              </Text>
            </TabsTrigger>
            <TabsTrigger value="following" className="flex-1">
              <Text
                className={cn(
                  "text-xl font-semibold",
                  currentScreen === "following"
                    ? "text-blue-500"
                    : "dark:text-white"
                )}
              >
                Seguindo
              </Text>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <SearchInput 
          value={search}
          onChangeText={(e)=>setSearch(e)}
        />
      </View>

      <View className="mt-4 flex-1 px-6">
        {currentScreen === "for-you" && (
          <ScrollableList
            data={displayedPosts}
            renderItem={({ item }) => (
              <PostCard refetch={refetch} post={item} />
            )}
            ListEmptyComponent={()=> (
              <Text>
                Sem posts
              </Text>
            )}
            viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
            onViewableItemsChanged={()=>{}}
            handleScroll={handleScroll}
            refreshControl={<RefreshControl onRefresh={refetch} refreshing={isLoading} />}
          />
        )}

        {currentScreen === "following" && (
          <ScrollableList
            data={displayedPosts}
            renderItem={({ item }) => (
              <PostCard refetch={refetch} post={item} />
            )}
            handleScroll={handleScroll}
            refreshControl={<RefreshControl onRefresh={refetch} refreshing={isLoading} />}
          />
        )}
      </View>
    </TabsContainer>
  );
};

export default Home;
