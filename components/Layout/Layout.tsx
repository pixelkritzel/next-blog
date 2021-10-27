import { IPageSettings } from 'backend-types/page-settings';
import { MainNav } from 'components/MainNav';
import Link from 'next/link';
import React, { useContext } from 'react';

import CSS from './Layout.module.scss';

type LayoutProps = {
  children?: React.ReactNode;
} & IPageSettings;

export const Layout = function LayoutFn({ children, title, sub_heading, navgation, ...otherProps }: LayoutProps) {
  return (
    <div className={CSS.container} {...otherProps}>
      <h1>
        <Link href="/">
          <a>{title}</a>
        </Link>
      </h1>
      {sub_heading && <div>{sub_heading}</div>}
      <MainNav links={navgation} />
      {children}
    </div>
  );
};
