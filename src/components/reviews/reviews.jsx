import "./reviews.css";

function Reviews() {
    const reviews = [
        {
            text: "The best coffee I've ever had. The flavour is incredible and the atmosphere is amazing.",
            name: "Sarah M.",
            role: "Coffee Lover"
        },
        {
            text: "I love coming here to work. Great coffee, friendly staff and a really comfortable environment.",
            name: "Michael T.",
            role: "Regular Customer"
        },
        {
            text: "Professional service and amazing quality. BODREN has become my favourite coffee shop.",
            name: "Emma R.",
            role: "Coffee Enthusiast"
        }
    ];

    return (
        <section className="reviews">

            <div className="reviews-heading">
                <span>TESTIMONIALS</span>
                <h2>What Our Customers Say</h2>
                <p>Real experiences from people who love our coffee.</p>
            </div>

            <div className="review-cards">

                {reviews.map((review, index) => (
                    <div className="review-card" key={index}>

                        <i className="bi bi-quote quote"></i>

                        <p>
                            "{review.text}"
                        </p>

                        <div className="stars">
                            ★ ★ ★ ★ ★
                        </div>

                        <div className="review-user">
                            <div className="user-avatar">
                                {review.name.charAt(0)}
                            </div>

                            <div>
                                <h6>{review.name}</h6>
                                <span>{review.role}</span>
                            </div>
                        </div>

                    </div>
                ))}

            </div>

        </section>
    );
}

export default Reviews;