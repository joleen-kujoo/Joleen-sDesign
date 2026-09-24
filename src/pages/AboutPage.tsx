import { Link } from "react-router-dom";
import { useInView } from "@/hooks/useInView";
import { aboutProfile } from "@/content/resume";

function SkillBar({
  name,
  value,
  animate,
}: {
  name: string;
  value: number;
  animate: boolean;
}) {
  return (
    <div className="sg-resume-skill">
      <div className="sg-resume-skill__head">
        <span>{name}</span>
        <span>{value}</span>
      </div>
      <div className="sg-resume-skill__track">
        <div
          className="sg-resume-skill__fill"
          style={{ width: animate ? `${value}%` : "0%" }}
        />
      </div>
    </div>
  );
}

function SectionKicker({
  index,
  label,
}: {
  index: string;
  label: string;
}) {
  return (
    <p className="sg-about-kicker">
      <span className="sg-about-kicker__index">/ {index}</span>
      <span className="sg-about-kicker__label">{label}</span>
    </p>
  );
}

export default function AboutPage() {
  const p = aboutProfile;
  const skillsReveal = useInView(0.12);

  return (
    <main className="sg-about-page">
      <section className="sg-about-hero">
        <Link to="/about" className="sg-about__home">← Portfolio</Link>

        <SectionKicker index="01" label="Hello, I'm" />

        <div className="sg-about-hero__grid">
          <div className="sg-about-hero__copy">
            <h1 className="sg-about-hero__title">
              {p.titleLines.map((line) => (
                <span
                  key={line.text}
                  className={line.accent ? "sg-about-hero__accent" : undefined}
                >
                  {line.text}
                </span>
              ))}
            </h1>
            <p className="sg-about-hero__intro">{p.intro}</p>
            <ul className="sg-about-meta">
              <li>{p.location}</li>
              <li>
                <a href={`mailto:${p.email}`}>{p.email}</a>
              </li>
              <li>
                <a href={`tel:${p.phone.replace(/\s/g, "")}`}>{p.phone}</a>
              </li>
            </ul>
          </div>

          <aside className="sg-about-profile-card" aria-label="Profile">
            <img
              className="sg-about-profile-card__photo"
              src={p.photo}
              alt={p.photoAlt}
              width={560}
              height={700}
              draggable={false}
            />
            <div className="sg-about-profile-card__meta">
              <p className="sg-about-profile-card__handle">{p.handle}</p>
              <p className="sg-about-profile-card__role">{p.roleLine}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="sg-about-section">
        <SectionKicker index="02" label="What I'm good at" />
        <h2 className="sg-about-section__title">Strategy &amp; Design.</h2>
        <p className="sg-about-section__lead">{p.skillsBlurb}</p>

        <div
          ref={skillsReveal.ref}
          className="sg-about-skills-grid"
        >
          {p.skillGroups.map((group) => (
            <article key={group.title} className="sg-resume-skill-card">
              <h3>
                <span aria-hidden>{group.icon}</span>
                {group.title}
              </h3>
              {group.items.map((item) => (
                <SkillBar
                  key={item.name}
                  name={item.name}
                  value={item.value}
                  animate={skillsReveal.visible}
                />
              ))}
            </article>
          ))}
        </div>
      </section>

      <section className="sg-about-section">
        <SectionKicker index="03" label="Where I've been" />
        <h2 className="sg-about-section__title">Career.</h2>

        <div className="sg-about-career">
          <div className="sg-about-career__line" aria-hidden />
          {p.experience.map((job, index) => {
            const isNew = "isNew" in job && job.isNew;
            const side = index % 2 === 0 ? "is-left" : "is-right";
            return (
              <article
                key={job.period + job.company}
                className={`sg-about-career__item ${side}${isNew ? " is-new" : ""}`}
              >
                <span className="sg-about-career__dot" aria-hidden />
                <div className="sg-about-career__body">
                  <time className="sg-about-career__when">{job.period}</time>
                  <h3>{job.company}</h3>
                  <p className="sg-about-career__role">{job.title}</p>
                  <p className="sg-about-career__desc">
                    {job.bullets.join("")}
                  </p>
                  {isNew ? (
                    <span className="sg-about-career__badge">New</span>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="sg-about-section">
        <SectionKicker index="04" label="Supported by" />
        <h2 className="sg-about-section__title">Markets Covered.</h2>
        <p className="sg-about-section__lead">{p.marketsBlurb}</p>

        <ul className="sg-about-markets">
          {p.markets.map((m) => (
            <li key={m.region + m.brand}>
              <span className="sg-about-markets__region">{m.region}</span>
              {m.brand ? (
                <span className="sg-about-markets__brand">{m.brand}</span>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      <section className="sg-resume-contact">
        <div>
          <h2>Let&apos;s Talk</h2>
          <p>{p.contactBlurb}</p>
        </div>
        <a href={`mailto:${p.email}`}>{p.email}</a>
      </section>

      <footer className="sg-about-foot">
        <div className="sg-about-foot__col">
          <h2>Personal</h2>
          <dl>
            <div>
              <dt>姓名</dt>
              <dd>{p.personal.name}</dd>
            </div>
            <div>
              <dt>生日</dt>
              <dd>{p.personal.birthday}</dd>
            </div>
          </dl>
        </div>
        <div className="sg-about-foot__col">
          <h2>Education</h2>
          <dl>
            <div>
              <dt>毕业院校</dt>
              <dd>{p.education.school}</dd>
            </div>
            <div>
              <dt>学历</dt>
              <dd>{p.education.degree}</dd>
            </div>
            <div>
              <dt>专业</dt>
              <dd>{p.education.major}</dd>
            </div>
          </dl>
        </div>
        <p className="sg-about-foot__studio">{p.studioName}</p>
        <p className="sg-about-foot__note">{p.footerNote}</p>
      </footer>
    </main>
  );
}
