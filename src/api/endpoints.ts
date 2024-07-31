import Config from 'react-native-config';

export const BASE_URL = Config.API_URL;
export const endpoints = {
  user: '/users/user/',
  sendCode: '/users/send_code/',
  refreshToken: '/users/token/refresh/',
  verifyCode: '/users/verify_code/',
  logout: '/users/logout/',
  SOSContacts: '/sos/contacts/',
  SOSSendLocation: '/sos/send-distress/',
  videoCoursesList: '/videocourses/list/',
  videoCoursePlaylist: '/videocourses/videos/',
  articleCategories: '/articles/categories/',
  articlesListByCategory: '/articles/category/',
  articleById: '/articles/article/',
  forumPosts: '/forum/posts/',
  chatWithAI: '/kenai/chat-proxy/',
  postReply: (id: number) => `/forum/posts/${id}/replies/`,
};
