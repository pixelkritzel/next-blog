import React from 'react';

interface HtmlProps {
  html: string;
}

export const HTML = function HtmlFn({ html, ...otherProps }: HtmlProps) {
  return <div {...otherProps} dangerouslySetInnerHTML={{ __html: html }} />;
};
