export type StrapiImageType = {
  id: number;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    [K in ImageSizes]: {
      name: string;
      hash: string;
      ext: string;
      mime: string;
      width: number;
      height: number;
      size: number;
      path: null | 'string';
      url: string;
    };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null | 'string';
  provider: string;
  provider_metadata: null;
  created_at: string;
  updated_at: string;
};
