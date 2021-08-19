import { matchPath } from 'react-router';
import { minify } from 'html-minifier';

import { routes } from '@rss/app/src/routes';

export const getRoute = (url: string) => {
  for (const [path, component] of Object.entries(routes)) {
    const match = matchPath(url, { path, strict: true, exact: true });

    if (match) return [match, component] as const;
  }

  return null;
};

export const minifyHTML = (html: string) =>
  minify(html, {
    collapseWhitespace: true,
    minifyCSS: true,
  });
