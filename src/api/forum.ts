import axiosInstance from 'api/axiosInstance.ts';
import {endpoints} from 'api/endpoints.ts';

export const getConversations = async (
  cursor: string | null,
  type: string = 'all',
) => {
  const data = await axiosInstance.get<{
    results: IPostedConversation[];
    next: string | null;
    newAdded?: boolean;
    deletedId?: number;
  }>(
    `${endpoints.forumPosts}?type=${type}&page_size=5${
      cursor ? `&cursor=${cursor}` : ''
    }`,
  );
  return data.data;
};

export const postConversation = async (text: string /*IConversation*/) => {
  return await axiosInstance.post(endpoints.forumPosts, {text});
};

export const getConversationById = async (id: number) => {
  return await axiosInstance.get<IPostedConversation & {replies: IAnswer[]}>(
    `${endpoints.forumPosts}${id}/`,
  );
};

export const deleteConversation = async (id: number) => {
  return await axiosInstance.delete(`${endpoints.forumPosts}${id}/`);
};

export const postReply = async (id: number, text: string) => {
  return await axiosInstance.post(endpoints.postReply(id), {text});
};

export interface IConversation {
  text: string;
  tags: [
    {
      name: string;
    },
  ];
  user: IAuthor;
  created_at: string;
  views: number;
}

export interface IPostedConversation {
  id: number;
  image: string;
  text: string;
  tags: [
    {
      name: string;
    },
  ];
  views: number;
  user: IAuthor;
  created_at: string;
  is_author: string;
  content: string;
}

export interface IAuthor {
  first_name: string;
  last_name: string;
  profile_photo: string;
  color: string;
}

export interface IAnswer {
  id: number;
  text: string;
  user: IAuthor;
  created_at: string;
  is_author: boolean;
}
