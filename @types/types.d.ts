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
    total_points: number;
    liked_posts: LikedPost[];
    liked_newsletters: LikedNewsletter[];
    login_count: number;
    area_id: number;
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
    total_saved: number;
    images: { post_id: number; path: string }[];
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
    is_demo: boolean;
  };

  type LikedPost = {
    id: number;
    post_id: number;
    user_id: number;
  };

  type LikedNewsletter = {
    id: number;
    newsletter_id: number;
    user_id: number;
  };

  type Newsletter = {
    id: number;
    title: string;
    content: string;
    area_id: number;
    created_at: string;
    images: { path: string }[];
    total_likes: number;
    total_views: number;
    user: {
      username: string;
      id: number;
    };
    area: {
      name: string;
      id: number;
    };
    total_saved: number;
    is_demo: boolean;
  };

  type Team = {
    id: number;
    name: string;
    members_ids: number[];
  };

  type ProjectStatus = "RUNNING" | "FINISHED";

  type Project = {
    id: number;
    title: string;
    content: string;
    image: { path: string }[];
    area_id: number;
    team_id: number;
    owner_id: number;
    members_ids: number[];
    created_at: string;
    user: {
      username: string;
      id: number;
    };
    area: {
      name: string;
      id: number;
    };
    team: {
      name: string;
      id: number;
    };
    total_saved: number;
    status: ProjectStatus;
    is_demo: boolean;
  };

  type Program = {
    id: string;
    title: string;
    image: string;
    description: string;
  };

  type Quiz = {
    id: number;
    title: string;
    description: string;
    image: string;
    duration: string;
    questions: Question[];
    is_running: boolean;
    updated_at: string;
    created_at: string;
    total_answered: number;
    current_question_index: number;
  };

  type Question = {
    id: number;
    title: string;
    correct_answer: string;
    quiz_id: number;
    options: QuestionOption[];
    total_points: number;
    is_answered: boolean;
  };

  type QuestionOption = {
    id: number;
    title: string;
    answer: string;
    question_id: number;
  };

  type Achieviment = {
    id: string;
    title: string;
    progress: number;
    description: string;
    key: AchievimentKey;
    points: number
  };

  type IdeaStatus = "in-progress" | "recused" | "approved";

  type ExpoImageType = {
    uri: string;
    mimeType: string;
    fileName: string;
  };

  type PostCreate = {
    content: string;
    area_id: number;
    images?: ExpoImageType[];
  };

  type NewsletterCreate = {
    title: string;
    content: string;
    area_id: number;
    images?: ExpoImageType[];
  };

  type ProjectCreate = {
    area_id: number;
    content: string;
    title: string;
    team_id: number;
    members_ids: number[];
    image?: ExpoImageType;
  };

  type ItemType = "post" | "project" | "newsletter";

  type Message = {
    prompt: string;
    time: string;
    subject: string;
    avatar: string;
    userId: number;
    createdAt: string;
  };

  type GroupedMessages = {
    title: string;
    data: Message[];
  };

  type Idea = {
    user_id: number;
    id: number;
    title: string;
    description: string;
  };

  type RunningQuiz = {
    id: number;
    quiz_id: number;
    current_answer: number;
    total_right_answers: number;
    current_points;
    quiz: Quiz;
  };

  type ProductCategory =
    | "Todas"
    | "Tech"
    | "Garrafas"
    | "Fitness"
    | "Acessórios"
    | "Viagens";

  type Product = {
    id: number;
    title: string;
    description: string;
    points: number;
    image: string;
    category: ProductCategory;
  };
}

export {};
