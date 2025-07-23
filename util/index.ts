import dayjs from "dayjs";
import "dayjs/locale/pt-br";

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
  const avatar_default_url = process.env.EXPO_PUBLIC_EUROPOINT_IMAGE_STORAGE_URL;
  if(!avatar_default_url) throw new Error("avatar_default_url is not defined");
  return `${avatar_default_url}/program/${fileName}`
}

const convertToQuizImage = (fileName:string) => {
  const avatar_default_url = process.env.EXPO_PUBLIC_EUROPOINT_IMAGE_STORAGE_URL;
  if(!avatar_default_url) throw new Error("avatar_default_url is not defined");
  return `${avatar_default_url}/quizzes/${fileName}`
}

const getHoursSinceCreatedAt = (created_at: string) => {
  return dayjs(created_at).fromNow()
}

const isValidUrl = (url:string) => {
  if(url === undefined) return false;
  
  return (url.startsWith('file://'));
}

export {
    getNameInitials,
    convertToAvatar,
    convertToNewsletterImage,
    convertToProgramImage,
    convertToQuizImage,
    getHoursSinceCreatedAt,
    isValidUrl
}