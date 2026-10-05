import Navbar from "./components/navbar/navbar.jsx";
import Hero from "./components/hero/hero.jsx";
import Trending from "./components/trending/trending.jsx";
import "./App.css";

function App() {
    return (
        <div className="page">
            <Navbar />

            <Hero />

            <div className="section-title d-flex align-items-center gap-3">
                <hr className="flex-grow-1" />
                <h5 className="mb-0 text-nowrap">Our Popular Drinks</h5>
                <hr className="flex-grow-1" />
            </div>

            <Trending />
        </div>
    );
}

export default App;