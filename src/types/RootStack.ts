export type RootStackParamList = {
  Home: undefined;
  SOS: undefined;
  Forum: undefined;
  ForumChat: {
    chatId: number;
  };
  KenAi: undefined;
  Location: undefined;
  Tools: undefined;
  VideoCourse: {
    playlistId: number;
  };
  Video: {
    videoSrc: string;
    videoTitle: string;
    videoDescription: string;
  };
  ArticlesList: {
    categoryId: number;
  };
  Blog: {
    blogId: number;
  };
  BottomNav: undefined;
  PhoneNumber: undefined;
  VerifyCode: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
