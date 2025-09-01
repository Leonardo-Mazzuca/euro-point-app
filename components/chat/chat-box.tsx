import { View, Text } from "react-native";
import React from "react";
import { cn } from "@/lib/utils";
import UserButton from "../user-button";
import { EuroHelpLogo } from "../euro-help";

type ChatType = "user" | "bot";

type ChatBoxProps = {
  subject: string;
  prompt: string;
  time: string;
};

const BoxText = ({ text, type }: { text: string; type: ChatType }) => (
  <Text
    className={cn(
      "text-lg",
      type === "user"
        ? "text-blue-tertiary font-semibold"
        : "text-black dark:text-white"
    )}
  >
    {text}
  </Text>
);

const BoxItem = ({
  type,
  children,
}: {
  type: ChatType;
  children: React.ReactNode;
}) => (
  <View
    className={cn(
      "p-3 w-[250px] rounded-3xl rounded-tl-none",
      type === "user"
        ? "bg-blue-tertiary/5 dark:bg-blue-tertiary/20"
        : "bg-gray-light/50 dark:bg-zinc-800"
    )}
  >
    {children}
  </View>
);

const ChatBox = ({ prompt, subject }: ChatBoxProps) => {
  return (
    <View className="px-5 mt-5 gap-10">
      <View className="ms-auto flex-row items-start gap-3">
        <UserButton />
        <BoxItem type="user">
          <BoxText text={prompt} type="user" />
        </BoxItem>
      </View>
      <View className="me-auto flex-row items-start gap-3">
        <EuroHelpLogo />
        <BoxItem type="bot">
          <BoxText text={subject} type="bot" />
        </BoxItem>
      </View>
    </View>
  );
};

export default ChatBox;
