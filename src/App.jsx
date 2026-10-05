import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Menu from "./pages/menu/Menu";
import About from "./pages/about/About";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/menu" element={<Menu />} />

                <Route path="/about" element={<About />} />

            </Routes>

        </BrowserRouter>
    );
}

export default App;