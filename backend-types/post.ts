/**
 * Model definition for Post
 */

import { StrapiImageType } from './image';

type ImageSizes = 'thumbnail' | 'large' | 'medium' | 'small';
export interface IPost {
  id: string;
  title: string;
  lead?: string;
  html_content: string;
  header_image: null | StrapiImageType;
  meta_description: string;
  slug: string;
  publish_date: string;
}
