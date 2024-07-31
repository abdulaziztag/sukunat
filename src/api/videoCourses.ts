import axiosInstance from 'api/axiosInstance.ts';
import {endpoints} from 'api/endpoints.ts';

export const VIDEO_COURSES_PER_PAGE: number = 3;

export const getVideoCoursesList = async (pageId: number) => {
  return await axiosInstance.get<{results: IVideoCourse[]; count: number}>(
    `${endpoints.videoCoursesList}?page_size=${VIDEO_COURSES_PER_PAGE}&page=${pageId}`,
  );
};

export const getVideoCoursePlaylist = async (playlistId: number) => {
  return await axiosInstance.get<
    {results: IVideo[]} & {video_course: IVideoCourse}
  >(`${endpoints.videoCoursePlaylist}${playlistId}/`);
};

export interface IVideoCourse {
  id: number;
  image: string;
  title: string;
  description: string;
  video_count: number;
  total_duration: string;
  created_at: string;
}

export interface IVideo {
  id: number;
  title: string;
  image: string;
  youtube_id: string;
  description: string;
  youtube_url: string;
  created_at: string;
}
