import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Menu from "./pages/menu/Menu";
import About from "./pages/about/About";
import Services from "./pages/services/Services";
import Reviews from "./pages/reviews/Reviews";
import Blog from "./pages/blog/Blog";
import Contact from "./pages/contact/Contact";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/menu" element={<Menu />} />

                <Route path="/about" element={<About />} />

                <Route path="/services" element={<Services />} />

                <Route path="/reviews" element={<Reviews />} />

                <Route path="/blog" element={<Blog />} />

                <Route path="/contact" element={<Contact />} />

            </Routes>

        </BrowserRouter>
    );
}

export default App;