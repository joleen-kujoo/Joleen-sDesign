import type { CSSProperties } from "react";

type AnimatedWordsProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p";
  baseDelay?: number;
};

/** 按词拆分，模拟原站 headline 逐字弹入 */
export function AnimatedWords({
  text,
  className,
  as = "h2",
  baseDelay = 0,
}: AnimatedWordsProps) {
  const Tag = as;
  const tokens = text.split(/(\s+|&|,)/).filter((t) => t.length > 0);
  let delay = baseDelay;

  return (
    <Tag className={className}>
      {tokens.map((token) => {
        const isSpace = token.trim() === "";
        const isPunct = token === "&" || token === ",";
        if (isSpace) {
          return <span key={`${delay}-sp`} className="space" aria-hidden />;
        }
        const style = { "--delay": delay } as CSSProperties;
        delay += 1;
        if (isPunct) {
          return (
            <span key={`${delay}-p`} className="word" style={style} aria-hidden>
              {token}
            </span>
          );
        }
        return (
          <span key={`${token}-${delay}`} className="word" style={style}>
            {token}
          </span>
        );
      })}
    </Tag>
  );
}
