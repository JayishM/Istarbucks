import { useEffect, useState } from "react";
import "./Inventory.css";

function Inventory() {
    // ==========================================
    // STATE
    // ==========================================

    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [restockAmount, setRestockAmount] = useState("");
    const [restocking, setRestocking] = useState(false);

    // History
    const [transactions, setTransactions] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [historyLoading, setHistoryLoading] = useState(false);


    // ==========================================
    // FETCH INVENTORY
    // ==========================================

    const fetchInventory = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                "http://localhost:3000/api/inventory"
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to fetch inventory"
                );
            }

            // Backend currently returns an array.
            // This also supports { ingredients: [...] }
            // just in case the backend format changes.
            const inventoryData = Array.isArray(data)
                ? data
                : Array.isArray(data?.ingredients)
                    ? data.ingredients
                    : [];

            setIngredients(inventoryData);

        } catch (error) {
            console.error("Failed to fetch inventory:", error);
            setIngredients([]);

        } finally {
            setLoading(false);
        }
    };


    // ==========================================
    // FETCH TRANSACTION HISTORY
    // ==========================================

    const fetchTransactions = async () => {
        try {
            setHistoryLoading(true);

            const response = await fetch(
                "http://localhost:3000/api/inventory/transactions"
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to fetch transaction history"
                );
            }

            // Backend currently returns an array.
            // Also supports { transactions: [...] }
            const transactionData = Array.isArray(data)
                ? data
                : Array.isArray(data?.transactions)
                    ? data.transactions
                    : [];

            setTransactions(transactionData);

        } catch (error) {
            console.error(
                "Failed to fetch transaction history:",
                error
            );

            setTransactions([]);

            alert(error.message);

        } finally {
            setHistoryLoading(false);
        }
    };


    // ==========================================
    // OPEN HISTORY
    // ==========================================

    const handleShowHistory = () => {
        setShowHistory(true);
        fetchTransactions();
    };


    // ==========================================
    // CLOSE HISTORY
    // ==========================================

    const handleCloseHistory = () => {
        setShowHistory(false);
    };


    // ==========================================
    // INITIAL LOAD
    // ==========================================

    useEffect(() => {
        fetchInventory();
    }, []);


    // ==========================================
    // STATUS
    // ==========================================

    const getStatus = (item) => {
        if (
            Number(item.quantity) <=
            Number(item.low_stock_threshold)
        ) {
            return "Low Stock";
        }

        return "In Stock";
    };


    // ==========================================
    // OPEN RESTOCK MODAL
    // ==========================================

    const openRestock = (ingredient) => {
        setSelectedIngredient(ingredient);
        setRestockAmount("");
    };


    // ==========================================
    // CLOSE RESTOCK MODAL
    // ==========================================

    const closeRestock = () => {
        if (restocking) return;

        setSelectedIngredient(null);
        setRestockAmount("");
    };


    // ==========================================
    // RESTOCK
    // ==========================================

    const handleRestock = async () => {
        if (!selectedIngredient) return;

        const amount = Number(restockAmount);

        if (!amount || amount <= 0) {
            alert("Please enter a valid restock quantity.");
            return;
        }

        try {
            setRestocking(true);

            const response = await fetch(
                `http://localhost:3000/api/inventory/${selectedIngredient.id}/restock`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        quantity: amount
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to restock"
                );
            }

            // Refresh inventory
            await fetchInventory();

            // Close modal
            setSelectedIngredient(null);
            setRestockAmount("");

            // Refresh history if already open
            if (showHistory) {
                await fetchTransactions();
            }

        } catch (error) {
            console.error("Restock error:", error);
            alert(error.message);

        } finally {
            setRestocking(false);
        }
    };


    // ==========================================
    // SAFE ARRAYS
    // ==========================================
    // These guarantee that .map(), .filter()
    // and .length can never crash the page.

    const safeIngredients = Array.isArray(ingredients)
        ? ingredients
        : [];

    const safeTransactions = Array.isArray(transactions)
        ? transactions
        : [];


    // ==========================================
    // LOW STOCK COUNT
    // ==========================================

    const lowStockCount = safeIngredients.filter(
        (item) =>
            Number(item.quantity) <=
            Number(item.low_stock_threshold)
    ).length;


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="inventory-page">
                <div className="inventory-loading">
                    Loading inventory...
                </div>
            </div>
        );
    }


    // ==========================================
    // PAGE
    // ==========================================

    return (
        <div className="inventory-page">

            {/* ==================================
                HEADER
            ================================== */}

            <section className="inventory-header">

                <div>
                    <span className="inventory-label">
                        ADMIN PANEL
                    </span>

                    <h1>
                        Inventory
                    </h1>

                    <p>
                        Monitor ingredient stock and
                        inventory levels.
                    </p>
                </div>


                {/* SUMMARY */}

                <div className="inventory-summary">

                    {/* TOTAL */}

                    <div className="summary-card">

                        <i className="bi bi-box-seam"></i>

                        <div>
                            <span>
                                Total Ingredients
                            </span>

                            <strong>
                                {safeIngredients.length}
                            </strong>
                        </div>

                    </div>


                    {/* LOW STOCK */}

                    <div className="summary-card">

                        <i className="bi bi-exclamation-triangle"></i>

                        <div>
                            <span>
                                Low Stock
                            </span>

                            <strong>
                                {lowStockCount}
                            </strong>
                        </div>

                    </div>

                </div>

            </section>


            {/* ==================================
                INVENTORY CARD
            ================================== */}

            <section className="inventory-card">

                {/* CARD HEADER */}

                <div className="inventory-card-header">

                    <div>
                        <h2>
                            Ingredients
                        </h2>

                        <p>
                            Current stock levels
                        </p>
                    </div>


                    {/* ACTION BUTTONS */}

                    <div
                        className="inventory-actions"
                        style={{
                            display: "flex",
                            gap: "10px"
                        }}
                    >

                        {/* HISTORY */}

                        <button
                            className="history-btn"
                            onClick={handleShowHistory}
                        >
                            <i className="bi bi-clock-history"></i>

                            History
                        </button>


                        {/* REFRESH */}

                        <button
                            className="refresh-btn"
                            onClick={fetchInventory}
                        >
                            <i className="bi bi-arrow-clockwise"></i>

                            Refresh
                        </button>

                    </div>

                </div>


                {/* ==================================
                    TABLE
                ================================== */}

                <div className="inventory-table-wrapper">

                    <table className="inventory-table">

                        <thead>

                            <tr>

                                <th>
                                    #
                                </th>

                                <th>
                                    Ingredient
                                </th>

                                <th>
                                    Quantity
                                </th>

                                <th>
                                    Unit
                                </th>

                                <th>
                                    Low Stock At
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {safeIngredients.map(
                                (item, index) => {

                                    const status =
                                        getStatus(item);

                                    const isLow =
                                        status === "Low Stock";

                                    return (

                                        <tr
                                            key={item.id}
                                        >

                                            {/* NUMBER */}

                                            <td>
                                                {index + 1}
                                            </td>


                                            {/* INGREDIENT */}

                                            <td>

                                                <div className="ingredient-name">

                                                    <div className="ingredient-icon">

                                                        <i className="bi bi-cup-hot"></i>

                                                    </div>

                                                    <strong>
                                                        {item.name}
                                                    </strong>

                                                </div>

                                            </td>


                                            {/* QUANTITY */}

                                            <td>

                                                <strong
                                                    className={
                                                        isLow
                                                            ? "stock-low"
                                                            : "stock-good"
                                                    }
                                                >
                                                    {Number(
                                                        item.quantity
                                                    ).toLocaleString()}
                                                </strong>

                                            </td>


                                            {/* UNIT */}

                                            <td>
                                                {item.unit}
                                            </td>


                                            {/* THRESHOLD */}

                                            <td>
                                                {Number(
                                                    item.low_stock_threshold
                                                ).toLocaleString()}
                                            </td>


                                            {/* STATUS */}

                                            <td>

                                                <span
                                                    className={
                                                        isLow
                                                            ? "status low"
                                                            : "status good"
                                                    }
                                                >
                                                    <span></span>

                                                    {status}

                                                </span>

                                            </td>


                                            {/* ACTION */}

                                            <td>

                                                <button
                                                    className="restock-btn"
                                                    onClick={() =>
                                                        openRestock(item)
                                                    }
                                                >
                                                    <i className="bi bi-plus-lg"></i>

                                                    Restock
                                                </button>

                                            </td>

                                        </tr>

                                    );
                                }
                            )}

                        </tbody>

                    </table>


                    {/* EMPTY */}

                    {safeIngredients.length === 0 && (

                        <div className="empty-inventory">

                            <i className="bi bi-box"></i>

                            <h3>
                                No ingredients found
                            </h3>

                            <p>
                                Your inventory is empty.
                            </p>

                        </div>

                    )}

                </div>

            </section>


            {/* =====================================
                RESTOCK MODAL
            ====================================== */}

            {selectedIngredient && (

                <div
                    className="restock-overlay"
                    onClick={closeRestock}
                >

                    <div
                        className="restock-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        {/* MODAL HEADER */}

                        <div className="restock-modal-header">

                            <div>

                                <span>
                                    INVENTORY
                                </span>

                                <h2>
                                    Restock Ingredient
                                </h2>

                            </div>


                            <button
                                className="close-restock"
                                onClick={closeRestock}
                                disabled={restocking}
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>

                        </div>


                        {/* INGREDIENT INFO */}

                        <div className="restock-ingredient">

                            <div className="restock-icon">
                                <i className="bi bi-box-seam"></i>
                            </div>

                            <div>

                                <strong>
                                    {selectedIngredient.name}
                                </strong>

                                <span>
                                    Current stock:{" "}
                                    {Number(
                                        selectedIngredient.quantity
                                    ).toLocaleString()}{" "}
                                    {selectedIngredient.unit}
                                </span>

                            </div>

                        </div>


                        {/* INPUT */}

                        <label className="restock-label">
                            Quantity to add
                        </label>


                        <div className="restock-input-wrapper">

                            <input
                                type="number"
                                min="1"
                                step="0.01"
                                value={restockAmount}
                                onChange={(e) =>
                                    setRestockAmount(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter quantity"
                                autoFocus
                                disabled={restocking}
                            />

                            <span>
                                {selectedIngredient.unit}
                            </span>

                        </div>


                        {/* PREVIEW */}

                        {Number(restockAmount) > 0 && (

                            <div className="restock-preview">

                                <span>
                                    New stock
                                </span>

                                <strong>

                                    {(
                                        Number(
                                            selectedIngredient.quantity
                                        ) +
                                        Number(restockAmount)
                                    ).toLocaleString()}{" "}

                                    {selectedIngredient.unit}

                                </strong>

                            </div>

                        )}


                        {/* BUTTONS */}

                        <div className="restock-actions">

                            <button
                                className="cancel-restock"
                                onClick={closeRestock}
                                disabled={restocking}
                            >
                                Cancel
                            </button>


                            <button
                                className="confirm-restock"
                                onClick={handleRestock}
                                disabled={restocking}
                            >

                                {restocking ? (

                                    <>
                                        <span className="restock-spinner"></span>
                                        Restocking...
                                    </>

                                ) : (

                                    <>
                                        <i className="bi bi-plus-lg"></i>
                                        Restock
                                    </>

                                )}

                            </button>

                        </div>

                    </div>

                </div>

            )}


            {/* =====================================
                INVENTORY HISTORY MODAL
            ====================================== */}

            {showHistory && (

                <div
                    className="history-overlay"
                    onClick={handleCloseHistory}
                >

                    <div
                        className="history-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        {/* HISTORY HEADER */}

                        <div className="history-header">

                            <div>

                                <h2>
                                    Inventory History
                                </h2>

                                <p>
                                    Track every stock movement
                                </p>

                            </div>


                            <button
                                className="close-history"
                                onClick={handleCloseHistory}
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>

                        </div>


                        {/* HISTORY CONTENT */}

                        {historyLoading ? (

                            <div className="history-loading">

                                <div className="history-spinner"></div>

                                <p>
                                    Loading history...
                                </p>

                            </div>

                        ) : safeTransactions.length === 0 ? (

                            <div className="history-empty">

                                <i className="bi bi-clock-history"></i>

                                <h3>
                                    No transactions yet
                                </h3>

                                <p>
                                    Inventory movements will appear here.
                                </p>

                            </div>

                        ) : (

                            <div className="history-table-wrapper">

                                <table className="history-table">

                                    <thead>

                                        <tr>

                                            <th>
                                                Date
                                            </th>

                                            <th>
                                                Ingredient
                                            </th>

                                            <th>
                                                Type
                                            </th>

                                            <th>
                                                Quantity
                                            </th>

                                            <th>
                                                Reference
                                            </th>

                                            <th>
                                                Note
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {safeTransactions.map(
                                            (transaction) => (

                                                <tr
                                                    key={
                                                        transaction.id
                                                    }
                                                >

                                                    {/* DATE */}

                                                    <td>
                                                        {transaction.created_at
                                                            ? new Date(
                                                                transaction.created_at
                                                            ).toLocaleString()
                                                            : "—"}
                                                    </td>


                                                    {/* INGREDIENT */}

                                                    <td>

                                                        <strong>
                                                            {
                                                                transaction.ingredient_name
                                                            }
                                                        </strong>

                                                    </td>


                                                    {/* TYPE */}

                                                    <td>

                                                        <span
                                                            className={`transaction-type ${
                                                                String(
                                                                    transaction.type || ""
                                                                ).toLowerCase()
                                                            }`}
                                                        >
                                                            {
                                                                transaction.type
                                                            }
                                                        </span>

                                                    </td>


                                                    {/* QUANTITY */}

                                                    <td>

                                                        <span
                                                            className={
                                                                Number(
                                                                    transaction.quantity
                                                                ) >= 0
                                                                    ? "quantity-positive"
                                                                    : "quantity-negative"
                                                            }
                                                        >

                                                            {Number(
                                                                transaction.quantity
                                                            ) >= 0
                                                                ? "+"
                                                                : ""}

                                                            {
                                                                transaction.quantity
                                                            }{" "}

                                                            {
                                                                transaction.unit
                                                            }

                                                        </span>

                                                    </td>


                                                    {/* REFERENCE */}

                                                    <td>

                                                        {
                                                            transaction.reference_id
                                                                ? `Order #${transaction.reference_id}`
                                                                : "—"
                                                        }

                                                    </td>


                                                    {/* NOTE */}

                                                    <td>

                                                        {
                                                            transaction.note ||
                                                            "—"
                                                        }

                                                    </td>

                                                </tr>

                                            )
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                </div>

            )}

        </div>
    );
}

export default Inventory;