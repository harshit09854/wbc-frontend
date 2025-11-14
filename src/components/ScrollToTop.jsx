// src/components/ScrollToTop.jsx
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ behavior = "auto" }) => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Make browser avoid automatic scroll restoration so we control it
    if ("scrollRestoration" in window.history) {
      try {
        window.history.scrollRestoration = "manual";
      } catch (e) {
        // some browsers (or strict CSP) may throw — ignore safely
      }
    }

    // Scroll to top on normal navigations (link clicks, programmatic navigation)
    window.scrollTo({ top: 0, behavior });

    // Listen for browser back/forward (popstate) and force scroll-to-top
    const onPopState = () => {
      // Use a tiny timeout to ensure it runs after the browser updates location,
      // but before paint (keeps UX smooth). You can remove setTimeout if not needed.
      setTimeout(() => window.scrollTo({ top: 0, behavior: "auto" }), 0);
    };

    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, [pathname, behavior]);

  return null;
};

export default ScrollToTop;
