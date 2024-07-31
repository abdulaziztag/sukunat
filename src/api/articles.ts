import axiosInstance from 'api/axiosInstance.ts';
import {endpoints} from 'api/endpoints.ts';

export const ARTICLES_PER_PAGE: number = 10;

export const getArticlesCategories = async () => {
  return await axiosInstance.get<IArticleCategory[]>(
    endpoints.articleCategories,
  );
};

export const getArticlesByCategory = async (id: number, pageId: number) => {
  return await axiosInstance.get<{results: IArticle[]; count: number}>(
    `${endpoints.articlesListByCategory}${id}/?page_size=${ARTICLES_PER_PAGE}&page=${pageId}`,
  );
};

export const getArticleById = async (id: number) => {
  return await axiosInstance.get<IArticle>(`${endpoints.articleById}${id}/`);
};

export interface IArticleCategory {
  id: string;
  name: string;
  icon: string;
  icon_id: string;
}

export interface IArticle {
  id: number;
  title: string;
  description: string;
  image: string;
  created_at: string;
  read_time: string;
}
