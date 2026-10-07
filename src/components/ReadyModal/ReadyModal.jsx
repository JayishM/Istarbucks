import "./ReadyModal.css";

function ReadyModal({ orderId, onClose }) {
    return (
        <div className="ready-overlay">
            <div className="ready-modal">

                <button
                    className="ready-close"
                    onClick={onClose}
                    aria-label="Close"
                >
                    ×
                </button>

                <div className="ready-coffee-icon">
                    <i className="bi bi-cup-hot-fill"></i>
                </div>

                <h2>
                    Your order #{orderId} is
                    <span>ready for pickup!</span>
                </h2>

                <p>
                    Please collect your order from the counter.
                </p>

                <button
                    className="ready-ok-btn"
                    onClick={onClose}
                >
                    OK
                </button>

            </div>
        </div>
    );
}

export default ReadyModal;