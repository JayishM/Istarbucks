import { useState } from "react";
import "./Blog.css";

import Navbar from "../../components/navbar/navbar.jsx";

import cappuccino from "../../assets/capuchino.png";
import espresso from "../../assets/espresso.png";
import coffee from "../../assets/float.png";
import Footer from "../../components/footer/footer.jsx";
function Blog() {
  const [category, setCategory] = useState("All");

  const posts = [
    {
      title: "The Art of Brewing the Perfect Coffee",
      category: "Coffee",
      date: "Oct 02, 2026",
      read: "5 min read",
      image: cappuccino,
      text: "Discover the small details that can transform an ordinary cup of coffee into something truly special."
    },
    {
      title: "Why Freshly Ground Beans Matter",
      category: "Coffee",
      date: "Sep 28, 2026",
      read: "4 min read",
      image: espresso,
      text: "From aroma to flavour, learn why grinding your coffee beans just before brewing makes such a difference."
    },
    {
      title: "Coffee & Productivity: The Perfect Pair",
      category: "Lifestyle",
      date: "Sep 21, 2026",
      read: "6 min read",
      image: coffee,
      text: "Can coffee actually help you focus? Explore how your daily cup can become part of a productive routine."
    },
    {
      title: "Understanding Different Coffee Roasts",
      category: "Coffee",
      date: "Sep 15, 2026",
      read: "5 min read",
      image: espresso,
      text: "Light, medium or dark? Learn how different roasting methods influence the flavour of your coffee."
    },
    {
      title: "Creating the Perfect Coffee Corner",
      category: "Lifestyle",
      date: "Sep 08, 2026",
      read: "4 min read",
      image: cappuccino,
      text: "Turn a small corner of your home into a cosy space made for slow mornings and great coffee."
    },
    {
      title: "Coffee Pairings You Need to Try",
      category: "Food",
      date: "Sep 01, 2026",
      read: "5 min read",
      image: coffee,
      text: "From chocolate desserts to buttery pastries, discover delicious combinations for your favourite brew."
    }
  ];

  const filteredPosts =
    category === "All"
      ? posts
      : posts.filter(post => post.category === category);

  return (
    <>
      <Navbar />

      <div className="blog-page">

        {/* HERO */}
        <section className="blog-hero">
          <span>OUR JOURNAL</span>

          <h1>
            Stories Behind the
            <strong> Coffee</strong>
          </h1>

          <p>
            Discover coffee stories, brewing tips, lifestyle inspiration
            and everything that makes a great cup worth enjoying.
          </p>
        </section>


        {/* FEATURED POST */}
        <section className="featured-post">

          <div className="featured-image">
            <img src={cappuccino} alt="Featured coffee" />
          </div>

          <div className="featured-content">

            <span className="blog-label">
              FEATURED STORY
            </span>

            <h2>
              The Journey From
              <strong> Bean to Cup</strong>
            </h2>

            <p>
              Ever wondered what happens before your favourite coffee
              reaches your cup? Follow the journey of a coffee bean from
              carefully selected farms to the final brewing process.
            </p>

            <div className="post-meta">
              <span>
                <i className="bi bi-calendar3"></i>
                Oct 05, 2026
              </span>

              <span>
                <i className="bi bi-clock"></i>
                7 min read
              </span>
            </div>

            <button className="read-button">
              Read Article
              <i className="bi bi-arrow-right"></i>
            </button>

          </div>

        </section>


        {/* CATEGORIES */}
        <section className="blog-navigation">

          <div>
            <span className="blog-label">
              EXPLORE OUR STORIES
            </span>

            <h2>
              Latest <strong>Articles</strong>
            </h2>
          </div>

          <div className="blog-categories">

            {["All", "Coffee", "Lifestyle", "Food"].map(item => (
              <button
                key={item}
                className={category === item ? "active" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}

          </div>

        </section>


        {/* BLOG GRID */}
        <section className="blog-grid">

          {filteredPosts.map((post, index) => (

            <article className="blog-card" key={index}>

              <div className="blog-card-image">

                <img
                  src={post.image}
                  alt={post.title}
                />

                <span>
                  {post.category}
                </span>

              </div>

              <div className="blog-card-content">

                <div className="blog-card-meta">
                  <span>{post.date}</span>
                  <span>{post.read}</span>
                </div>

                <h3>{post.title}</h3>

                <p>{post.text}</p>

                <button className="article-link">
                  Read More
                  <i className="bi bi-arrow-right"></i>
                </button>

              </div>

            </article>

          ))}

        </section>


        {/* NEWSLETTER */}
        <section className="blog-newsletter">

          <div className="newsletter-icon">
            <i className="bi bi-envelope"></i>
          </div>

          <span>STAY IN THE LOOP</span>

          <h2>
            Fresh stories,
            <strong> straight to your inbox.</strong>
          </h2>

          <p>
            Get coffee tips, new stories and updates delivered
            directly to your inbox.
          </p>

          <div className="newsletter-form">

            <input
              type="email"
              placeholder="Enter your email address"
            />

            <button>
              Subscribe
              <i className="bi bi-arrow-right"></i>
            </button>

          </div>

        </section>

      </div>
      <Footer/>
    </>
  );
}

export default Blog;