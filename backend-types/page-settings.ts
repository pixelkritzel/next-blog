/**
 * Model definition for Page Settings
 */
export interface IPageSettings {
  id: string;
  title: string;
  sub_heading?: string;
  navgation: Array<{ display_name: string; url: string }>;
}
