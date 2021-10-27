import { IPageSettings } from 'backend-types/page-settings';
import React from 'react';
import Link from 'next/link';

type MainNavProps = { links: IPageSettings['navgation'] };

export const MainNav = function MainNavFn({ links, ...otherProps }: MainNavProps) {
  return links.length > 0 ? (
    <nav {...otherProps}>
      <ul>
        {links.map(({ display_name, url }, index) => (
          <li key={index}>
            <Link href={url}>
              <a>{display_name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  ) : null;
};
