import { AchievimentKey } from "@/hooks/use-achieviments";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { achievimentPreview, askedBot, editProfile, hello, logged100Times, logged10Times, logged50Times, missOne, noErrors, played15Quiz, played5Quiz, playedQuiz, posted10Posts, posted30posts, read15Program, read5Program, readProgram, saveOnePost } from "./images";

const getNameInitials = (name: string) => {
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

const convertToAvatar = (fileName:string) => {
  const avatar_default_url = process.env.EXPO_PUBLIC_EUROPOINT_IMAGE_STORAGE_URL;
  if(!avatar_default_url) throw new Error("avatar_default_url is not defined");
  return `${avatar_default_url}/profile/${fileName}`
}

const convertToNewsletterImage = (fileName:string) => {
  const avatar_default_url = process.env.EXPO_PUBLIC_EUROPOINT_IMAGE_STORAGE_URL;
  if(!avatar_default_url) throw new Error("avatar_default_url is not defined");
  return `${avatar_default_url}/newsletter/${fileName}`
}

const convertToProgramImage = (fileName:string) => {
  const program_image_url = process.env.EXPO_PUBLIC_IMG_STORAGE_URL;
  if(!program_image_url) throw new Error("program_url is not defined");
  return `${program_image_url}${fileName}`
}

const convertToQuizImage = (fileName:string) => {
  const program_image_url = process.env.EXPO_PUBLIC_IMG_STORAGE_URL;
  if(!program_image_url) throw new Error("program_url is not defined");
  return `${program_image_url}${fileName}`
}

const getStorageImageUrl = (fileName: string) => {
  const image_storage_url = process.env.EXPO_PUBLIC_IMG_STORAGE_URL;
  if(!image_storage_url) throw new Error("program_url is not defined");
  return `${image_storage_url}${fileName}`
}

const getHoursSinceCreatedAt = (created_at: string) => {
  return dayjs(created_at).fromNow()
}

const isValidUrl = (url:string) => {
  if(url === undefined) return false;
  
  return (url.startsWith('file://'));
}

const getNewsletterImage = (newsletter:Newsletter) => {
  const image = newsletter?.images?.[0]?.path ?
  `${process.env.EXPO_PUBLIC_EUROPOINT_API_URL}/images/newsletter/${newsletter?.images?.[0]?.path }` : "";

  return image;
}

const getProjectImage = (project:Project) => {
  const image = project?.image?.[0]?.path ?
  `${process.env.EXPO_PUBLIC_EUROPOINT_API_URL}/images/project/${project?.image?.[0]?.path }` : "";

  return image;
}

const getAchievimentImages = (key: string) => {
  const imagesMap: Record<string, any> = {
    FIRST_LOGIN: hello,
    NO_ERRORS: noErrors,
    MISS_ONE: missOne,
    REGISTERED_POST: saveOnePost,
    REGISTERED_10_POST: posted10Posts,
    REGISTERED_30_POST: posted30posts,
    EDIT_PROFILE: editProfile,
    PLAYED_QUIZ: playedQuiz,
    PLAYED_QUIZ_5: played5Quiz,
    PLAYED_QUIZ_15: played15Quiz,
    READ_PROGRAM: readProgram,
    READ_5_PROGRAM: read5Program,
    READ_15_PROGRAM: read15Program,
    ASKED_BOT: askedBot,
    LOGGED_10_TIMES_IN_ROW: logged10Times,
    LOGGED_50_TIMES_IN_ROW: logged50Times,
    LOGGED_100_TIMES_IN_ROW: logged100Times,
  };

  return imagesMap[key] || achievimentPreview;
};


export {
    getNameInitials,
    convertToAvatar,
    convertToNewsletterImage,
    convertToProgramImage,
    convertToQuizImage,
    getHoursSinceCreatedAt,
    isValidUrl,
    getProjectImage,
    getNewsletterImage,
    getStorageImageUrl,
    getAchievimentImages
}