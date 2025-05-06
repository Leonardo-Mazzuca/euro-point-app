import { Animated, Text } from "react-native";
import React, { useRef } from "react";
import TabsContainer from "@/components/tabs-container";
import AnimatedView from "@/components/animated-view";
import Header from "@/components/header";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Projects = () => {
  const uiTranslateY = useRef(new Animated.Value(0)).current;
  const {handleScroll,uiOpacity} = useScrollAnimation({translateValue: uiTranslateY});

  return (
    <TabsContainer>
      <AnimatedView
        style={{
          opacity: uiOpacity,
          transform: [{ translateY: uiTranslateY }],
        }}
      >
        <Header />
      </AnimatedView>
    </TabsContainer>
  );
};

export default Projects;
