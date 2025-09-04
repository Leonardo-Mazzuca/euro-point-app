import React, { useEffect, useState } from "react";
import { Text } from "react-native";

const ThinkingText = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Text className="dark:text-white font-semibold">
      Pensando{dots}
    </Text>
  );
};

export default ThinkingText;
