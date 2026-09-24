import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { siteTitle } from "@/content/data";
import { TopNav } from "@/components/sg/TopNav";
import { ColorPicker } from "@/components/sg/ColorPicker";
import { PageLoader } from "@/components/PageLoader";

const IndexPage = lazy(() => import("@/pages/IndexPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));

export default function App() {
  useEffect(() => {
    document.title = siteTitle;
  }, []);

  return (
    <>
      <TopNav />
      <ColorPicker />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<AboutPage />} />
          <Route path="/about" element={<IndexPage />} />
          <Route path="/resume" element={<Navigate to="/" replace />} />
          <Route path="/portfolio" element={<Navigate to="/about" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
}
