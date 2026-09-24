import { useRef } from "react";
import { heroImage, site } from "@/content/data";
import { HeroWarpText } from "@/components/sg/HeroWarpText";
import { useHero089Scroll } from "@/hooks/useHero089Scroll";

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  useHero089Scroll(heroRef);

  return (
    <section ref={heroRef} className="sg-hero sg-hero--play sg-hero--089">
      <div className="sg-hero__top">
          <p className="sg-hero__location">{site.location}</p>
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>

        <div className="sg-hero__mid">
          <HeroWarpText
            text={site.nameParts.join(" ")}
            as="h1"
            className="sg-hero__title"
          />
          <p className="sg-hero__name-zh">{site.name}</p>

          <figure className="sg-hero__visual">
            <img src={heroImage.src} alt="" draggable={false} />
          </figure>

          <HeroWarpText
            text={site.role}
            as="h2"
            className="sg-hero__role"
          />
        </div>

        <div className="sg-hero__bot">
          <div className="sg-hero__clients">
            <strong>{site.clientsLabel}</strong>
            <p className="sg-hero__expertise-en">{site.clients}</p>
            {site.roleZh ? (
              <p className="sg-hero__expertise-zh">{site.roleZh}</p>
            ) : null}
          </div>
        </div>
    </section>
  );
}
