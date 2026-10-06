import "./Contact.css";
import Navbar from "../../components/navbar/navbar.jsx";

function Contact() {
  return (
    <>
      <Navbar />

      <div className="contact-page">

        {/* HERO */}
        <section className="contact-hero">
          <span>GET IN TOUCH</span>

          <h1>
            We'd Love to
            <strong> Hear From You</strong>
          </h1>

          <p>
            Have a question, suggestion or simply want to say hello?
            Our team is always happy to hear from you.
          </p>
        </section>


        {/* CONTACT SECTION */}
        <section className="contact-section">

          {/* LEFT SIDE */}
          <div className="contact-info">

            <span className="contact-label">
              CONTACT US
            </span>

            <h2>
              Let's start a
              <strong> conversation.</strong>
            </h2>

            <p>
              Whether you have a question about our coffee, want to
              plan an event, or just want to share your experience,
              feel free to reach out.
            </p>


            <div className="contact-details">

              <div className="contact-item">

                <div className="contact-icon">
                  <i className="bi bi-geo-alt"></i>
                </div>

                <div>
                  <span>VISIT US</span>
                  <p>
                    123 Coffee Street<br />
                    Jaipur, Rajasthan
                  </p>
                </div>

              </div>


              <div className="contact-item">

                <div className="contact-icon">
                  <i className="bi bi-telephone"></i>
                </div>

                <div>
                  <span>CALL US</span>
                  <p>
                    +91 98765 43210
                  </p>
                </div>

              </div>


              <div className="contact-item">

                <div className="contact-icon">
                  <i className="bi bi-envelope"></i>
                </div>

                <div>
                  <span>EMAIL US</span>
                  <p>
                    hello@istarbucks.com
                  </p>
                </div>

              </div>

            </div>


            {/* SOCIALS */}
            <div className="contact-socials">

              <span>FOLLOW US</span>

              <div>
                <a href="#">
                  <i className="bi bi-instagram"></i>
                </a>

                <a href="#">
                  <i className="bi bi-facebook"></i>
                </a>

                <a href="#">
                  <i className="bi bi-twitter-x"></i>
                </a>

                <a href="#">
                  <i className="bi bi-youtube"></i>
                </a>
              </div>

            </div>

          </div>


          {/* FORM */}
          <div className="contact-form-container">

            <div className="contact-form-heading">
              <span>SEND A MESSAGE</span>

              <h3>
                How can we <strong>help?</strong>
              </h3>
            </div>


            <form className="contact-form">

              <div className="form-row">

                <div className="form-group">
                  <label>Your Name</label>

                  <input
                    type="text"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>

              </div>


              <div className="form-group">

                <label>Subject</label>

                <input
                  type="text"
                  placeholder="What is this about?"
                />

              </div>


              <div className="form-group">

                <label>Message</label>

                <textarea
                  rows="5"
                  placeholder="Tell us how we can help..."
                ></textarea>

              </div>


              <button type="submit" className="contact-button">
                Send Message
                <i className="bi bi-arrow-right"></i>
              </button>

            </form>

          </div>

        </section>


        {/* OPENING HOURS */}
        <section className="contact-hours">

          <div className="hours-content">

            <span>COME VISIT US</span>

            <h2>
              We're always
              <strong> brewing.</strong>
            </h2>

            <p>
              Drop by for your favourite coffee, a quick chat,
              or simply some time to yourself.
            </p>

          </div>


          <div className="hours-list">

            <div>
              <span>Monday — Friday</span>
              <strong>7:00 AM — 10:00 PM</strong>
            </div>

            <div>
              <span>Saturday</span>
              <strong>8:00 AM — 11:00 PM</strong>
            </div>

            <div>
              <span>Sunday</span>
              <strong>8:00 AM — 9:00 PM</strong>
            </div>

          </div>

        </section>


        {/* LOCATION */}
        <section className="contact-location">

          <div className="location-map">

            <div className="map-content">
              <i className="bi bi-geo-alt-fill"></i>

              <span>ISTARBUCKS</span>

              <p>
                Jaipur, Rajasthan
              </p>
            </div>

          </div>


          <div className="location-content">

            <span>OUR LOCATION</span>

            <h2>
              Find your way to
              <strong> great coffee.</strong>
            </h2>

            <p>
              We're located in the heart of Jaipur, creating a
              warm and welcoming space for coffee lovers.
            </p>

            <button className="direction-button">
              Get Directions
              <i className="bi bi-arrow-up-right"></i>
            </button>

          </div>

        </section>


        {/* CTA */}
        <section className="contact-cta">

          <span>STILL HAVE QUESTIONS?</span>

          <h2>
            We're just a
            <strong> message away.</strong>
          </h2>

          <p>
            Don't hesitate to reach out. We'd love to hear from you.
          </p>

        </section>
      </div>
    </>
  );
}

export default Contact;