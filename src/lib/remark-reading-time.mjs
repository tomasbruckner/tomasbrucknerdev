import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const { minutes } = getReadingTime(textOnPage);
    data.astro.frontmatter.minutesRead = Math.max(1, Math.round(minutes));
  };
}
