import { IconProps } from "@expo/vector-icons/build/createIconSet";
import Feather from "@expo/vector-icons/Feather";
import React from "react";

declare global {
  type HomeScreen = "for-you" | "following";

  type ProfileItem = {
    icon: React.ReactNode;
    title: string;
    link?: string;
    isToggler?: boolean;
    rightChild?: React.ReactNode;
    isTogglerActive?: boolean;
    setToggleActive?: (value: boolean) => void;
  };

  type Option = {
    label: string;
    value: string;
  };

  type User = {
    id: number;
    avatar: string;
    email: string;
    password: string;
    phone_number: string;
    saved_newsletter_ids: number[];
    saved_posts_ids: number[];
    saved_projects_ids: number[];
    username: string;
    area: {
      name: string;
      id: number;
    };
    followed_areas: {
      name: string;
      id: number;
    }[];
  };

  type Area = {
    id: number;
    name: string;
    user_id: number[];
    contact_email: string;
  };

  type Post = {
    id: number;
    title: string;
    content: string;
    user_id: number;
    area_id: number;
    total_likes: number;
    total_views: number;
    images: string[];
    user: {
      id: number;
      username: string;
      avatar: string | null;
    };
    area: {
      id: number;
      name: string;
      contact_email: string;
    };
    created_at: string;
  };

  type Newsletter = {
    id: number;
    title: string;
    owner_id: number;
    image: string;
    channel_id: number;
    created_at: string;
    total_likes: number;
    total_views: number;
    content: string;
  };

  type Team = {
    id: number;
    name: string;
    members_ids: number[];
  };

  type Project = {
    id: number;
    title: string;
    content: string;
    image: string;
    area_id: number;
    team_id: number;
    owner_id: number;
    members_ids: number[];
    created_at: string;
    user: {
        username: string,
        id: number
    }
    area: {
      name: string;
      id: number;
    }
  };

  type Program = {
    id: string;
    title: string;
    image: string;
    description: string;
  };

  type Quiz = {
    id: string;
    totalQuestions: number;
    image: string;
    title: string;
    duration: string;
    total_points: number;
  };

  type Question = {
    quizId: string;
    id: string;
    title: string;
    options: QuestionOption[];
    correctAnswer: string;
  };

  type QuestionOptions = {
    questionId: string;
    id: string;
    title: string;
    answer: string;
  };

  type Achieviment = {
    id: string;
    title: string;
    progress: number;
    description: string;
  };

  type IdeaStatus = "in-progress" | "recused" | "approved";

  type Idea = {
    id: string;
    title: string;
    content: string;
  };
}

export {};
