import { useRef } from "react";

type HeroWarpTextProps = {
  text: string;
  as?: "h1" | "h2";
  className?: string;
};

/** 按字拆分的标题行（滚动弯曲由 useHero089Scroll 驱动） */
export function HeroWarpText({
  text,
  as = "h1",
  className,
}: HeroWarpTextProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const Tag = as;
  const letters = text.split("");

  return (
    <Tag
      ref={rootRef as never}
      className={["sg-hero__warp-line", className].filter(Boolean).join(" ")}
      aria-label={text}
    >
      {letters.map((char, i) => (
        <span key={`${char}-${i}`} data-char className="sg-hero__char">
          {char === " " ? "\u00a0" : char}
        </span>
      ))}
    </Tag>
  );
}
