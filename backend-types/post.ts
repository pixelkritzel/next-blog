/**
 * Model definition for Post
 */
export interface IPost {
  id: string;
  title: string;
  lead?: string;
  content: string;
  header_image?: any;
  meta_description: string;
  slug: string;
}