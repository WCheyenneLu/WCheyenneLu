import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop({ disableScroll }) {
  const location = useLocation();
  // Get the current pathname

  useEffect(() => {
    if (!disableScroll) {
      window.scrollTo(0, 0);
    }
    // Scroll to the top of the page
  }, [location.pathname, disableScroll]); // Run this effect whenever the pathname changes

  return null; // This component doesn't render anything
}

export default ScrollToTop;
