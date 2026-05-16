import { Fragment, type ReactNode } from "react";

const STRONG_PATTERN = /<strong>([\s\S]*?)<\/strong>/g;

export function renderRichText(text: string | undefined): ReactNode {
  if (!text) return null;

  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  for (const match of text.matchAll(STRONG_PATTERN)) {
    const start = match.index ?? 0;
    if (start > lastIndex) {
      nodes.push(
        <Fragment key={key++}>{text.slice(lastIndex, start)}</Fragment>
      );
    }
    nodes.push(<strong key={key++}>{match[1]}</strong>);
    lastIndex = start + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>);
  }

  return nodes;
}
