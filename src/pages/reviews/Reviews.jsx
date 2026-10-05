import "./Reviews.css";
import Navbar from "../../components/navbar/navbar.jsx";
import Footer from "../../components/footer/footer.jsx";
function Reviews() {
  const reviews = [
    {
      name: "Aarav Sharma",
      role: "Regular Customer",
      rating: 5,
      text: "The coffee here is absolutely amazing. The cappuccino is rich, smooth and perfectly balanced. Definitely one of my favourite coffee places.",
      initials: "AS"
    },
    {
      name: "Ananya Mehta",
      role: "Coffee Lover",
      rating: 5,
      text: "Beautiful atmosphere and excellent coffee. I loved the attention to detail and the staff were incredibly friendly.",
      initials: "AM"
    },
    {
      name: "Rohan Kapoor",
      role: "Regular Customer",
      rating: 4,
      text: "Great coffee and a really relaxing place to spend time. Their espresso has a fantastic aroma and strong flavour.",
      initials: "RK"
    },
    {
      name: "Ishita Verma",
      role: "Coffee Enthusiast",
      rating: 5,
      text: "I tried their latte and absolutely loved it. Creamy, smooth and not overly sweet. I will definitely be coming back.",
      initials: "IV"
    },
    {
      name: "Kabir Malhotra",
      role: "Regular Customer",
      rating: 5,
      text: "One of the best coffee experiences I've had. The quality of the beans really makes a difference.",
      initials: "KM"
    },
    {
      name: "Meera Singh",
      role: "Coffee Lover",
      rating: 5,
      text: "Amazing coffee, beautiful ambience and great service. Everything feels carefully crafted here.",
      initials: "MS"
    }
  ];

  return (
    <>
      <Navbar />

      <div className="reviews-page">

        {/* HERO */}
        <section className="reviews-hero">
          <span>WHAT PEOPLE SAY</span>

          <h1>
            Loved by <strong>Coffee Lovers</strong>
          </h1>

          <p>
            Every cup tells a story. Here's what our customers have to say
            about their experience with us.
          </p>
        </section>

        {/* RATING SUMMARY */}
        <section className="reviews-summary">

          <div className="rating-main">
            <strong>4.9</strong>

            <div className="stars">
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
            </div>

            <span>Based on 500+ reviews</span>
          </div>

          <div className="rating-divider"></div>

          <div className="rating-stat">
            <strong>98%</strong>
            <span>Happy Customers</span>
          </div>

          <div className="rating-divider"></div>

          <div className="rating-stat">
            <strong>50K+</strong>
            <span>Cups Served</span>
          </div>

        </section>

        {/* REVIEWS */}
        <section className="reviews-grid">

          {reviews.map((review, index) => (
            <div className="review-card" key={index}>

              <div className="review-top">

                <div className="review-user">
                  <div className="review-avatar">
                    {review.initials}
                  </div>

                  <div>
                    <h3>{review.name}</h3>
                    <span>{review.role}</span>
                  </div>
                </div>

                <i className="bi bi-quote quote-icon"></i>

              </div>

              <div className="review-stars">
                {[...Array(review.rating)].map((_, i) => (
                  <i key={i} className="bi bi-star-fill"></i>
                ))}
              </div>

              <p>
                "{review.text}"
              </p>

            </div>
          ))}

        </section>

        {/* FEATURE REVIEW */}
        <section className="featured-review">

          <i className="bi bi-quote featured-quote"></i>

          <p>
            "Coffee is more than just a drink here. Every visit feels like
            a little escape from the everyday."
          </p>

          <div className="featured-stars">
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </div>

          <span>— Our Coffee Community</span>

        </section>

        {/* CTA */}
        <section className="reviews-cta">

          <span>HAVE YOU VISITED US?</span>

          <h2>
            Share your <strong>coffee story.</strong>
          </h2>

          <button>
            Write a Review
            <i className="bi bi-arrow-right"></i>
          </button>

        </section>

      </div>
      <Footer/>
    </>
  );
}

export default Reviews;