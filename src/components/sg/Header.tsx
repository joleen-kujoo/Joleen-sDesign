import { Link } from "react-router-dom";
import { site } from "@/content/data";

export function Header() {
  return (
    <header className="sg-header">
      <Link to="/about" className="sg-header__avatar" aria-label="About me">
        <img src={site.avatar} alt="" width={96} height={96} draggable={false} />
      </Link>
    </header>
  );
}
