import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Homepage from "./pages/homepage";
import PageNotFound from "./pages/PageNotFound";
import Services from "./pages/services";
import About from "./pages/about";
import Blog from "./pages/blog";
import Blogpost from "./pages/blogpost";
import Contact from "./pages/contact";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [service, setService] = useState(0);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="homepage" element={<Homepage setService={setService} />} />
        <Route
          path="services"
          element={<Services displayedService={service} />}
        />
        <Route path="about" element={<About />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blogpost" element={<Blogpost />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
