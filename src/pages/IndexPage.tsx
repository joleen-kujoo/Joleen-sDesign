import { useState, type CSSProperties } from "react";
import type { Project } from "@/content/data";
import { moreWorkProjects } from "@/lib/moreWorkProject";
import { featuredSeries } from "@/content/featuredSeries";
import type { FeaturedSeries } from "@/content/featuredSeries";
import { HeroSection } from "@/components/sg/HeroSection";
import { Carousel } from "@/components/sg/Carousel";
import { FeaturedSeriesModal } from "@/components/sg/FeaturedSeriesModal";
import { WorkModal } from "@/components/sg/WorkModal";
import { Footer } from "@/components/sg/Footer";
import { useInView } from "@/hooks/useInView";

export default function IndexPage() {
  const [seriesOpen, setSeriesOpen] = useState<FeaturedSeries | null>(null);
  const [open, setOpen] = useState<Project | null>(null);
  const featuredReveal = useInView(0.2);
  const gridReveal = useInView(0.08);

  return (
    <div className="sg-container">
      <HeroSection />

      <section
        ref={featuredReveal.ref}
        className={`sg-featured sg-reveal${featuredReveal.visible ? " is-visible" : ""}`}
      >
        <div className="sg-text-block">
          <h4>Featured Work</h4>
          <p>Click a series to view related work</p>
        </div>
        <Carousel
          series={featuredSeries}
          revealActive={featuredReveal.visible}
          onOpen={(s) => setSeriesOpen(s)}
        />
      </section>

      <section
        ref={gridReveal.ref}
        className={`sg-grid sg-grid--video-916${gridReveal.visible ? " is-visible" : ""}`}
      >
        <div className="sg-text-block">
          <h4>More Work</h4>
          <p>Take a scroll, stay a while</p>
        </div>
        {moreWorkProjects.map((project, i) => (
          <button
            key={project.slug}
            type="button"
            className="sg-grid__item"
            style={{ "--stagger": i % 12 } as CSSProperties}
            onClick={() => setOpen(project)}
          >
            <img
              src={project.cover}
              alt={project.cardLabel ?? project.title}
              loading="lazy"
            />
          </button>
        ))}
      </section>

      <Footer />
      <FeaturedSeriesModal
        series={seriesOpen}
        onClose={() => setSeriesOpen(null)}
      />
      <WorkModal
        project={open}
        variant="detail"
        mediaAspect="9:16"
        onClose={() => setOpen(null)}
      />
    </div>
  );
}
