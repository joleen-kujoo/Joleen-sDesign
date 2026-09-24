import { useRef, type CSSProperties } from "react";
import { site } from "@/content/data";
import { useFooterProgress } from "@/hooks/useFooterProgress";

export function Footer() {
  const phantomRef = useRef<HTMLDivElement>(null);
  const { progress, scale, linksOpacity } = useFooterProgress(phantomRef);

  return (
    <>
      <div ref={phantomRef} className="sg-phantom" aria-hidden />
      <footer
        className="sg-footer"
        data-revealed={progress > 0.02 ? "true" : "false"}
        style={
          {
            "--footer-progress": progress,
            "--footer-scale": scale,
            "--footer-links-opacity": linksOpacity,
          } as CSSProperties
        }
      >
        <p className="sg-footer__title">
          <span>Contact</span>
        </p>
        <div className="sg-footer__links">
          <ul className="sg-footer__list">
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
          </ul>
          <small>
            © {new Date().getFullYear()} {site.name}
          </small>
        </div>
      </footer>
    </>
  );
}
