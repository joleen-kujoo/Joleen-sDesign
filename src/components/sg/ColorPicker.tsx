import { useState, type CSSProperties } from "react";
import { useTheme } from "@/context/ThemeContext";

/** Fan arc: all swatches sit left of the toggle (no +X), even spacing, no viewport clip */
function fanOffset(idx: number) {
  const angle = 1.38 + idx * 0.5;
  const radiusRem = 4.35;
  return {
    tx: `${Math.sin(angle) * -radiusRem}rem`,
    ty: `${Math.cos(angle) * radiusRem}rem`,
  };
}

export function ColorPicker() {
  const { themeId, setThemeId, themes } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="sg-picker-anchor">
    <div className={`sg-picker${open ? " is-open" : ""}`}>
      {themes.map((t, idx) => (
        <label
          key={t.id}
          style={
            {
              "--idx": idx,
              "--tx": fanOffset(idx).tx,
              "--ty": fanOffset(idx).ty,
            } as CSSProperties
          }
          title={`Theme ${t.id}`}
        >
          <input
            type="radio"
            name="theme"
            value={t.id}
            checked={themeId === t.id}
            onChange={() => {
              setThemeId(t.id);
              setOpen(false);
            }}
            style={{ "--swatch": t.primary } as CSSProperties}
          />
        </label>
      ))}
      <button
        type="button"
        className="sg-btn-round sg-picker__toggle"
        aria-label="Color themes"
        onClick={() => setOpen((v) => !v)}
      >
        ◐
      </button>
    </div>
    </div>
  );
}
