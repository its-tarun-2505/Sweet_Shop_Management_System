import { useDispatch, useSelector } from "react-redux";
import AdminSweetActions from "../admin/AdminSweetActions";
import { purchaseSweetById } from "../../features/sweetShop/shopController";
import styles from "../../stylesheet/Sweet.module.css";

/**
 * SweetCard
 * Displays individual sweet details and actions
 */
const SweetCard = ({ sweet }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Handle purchase flow
  const handlePurchase = () => {
    const qty = Number(prompt("Enter quantity to purchase", "1"));
    if (!qty || qty <= 0) return;

    dispatch(
      purchaseSweetById({
        id: sweet._id,
        quantity: qty,
      })
    );
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>{sweet.name}</h3>
        <span className={styles.category}>{sweet.category}</span>
      </div>

      <div>
        <p>
          <strong>Price:</strong> ₹{sweet.price} / {sweet.unit}
        </p>
        <p>
          <strong>Available:</strong> {sweet.quantity}
        </p>
        <p
          className={
            sweet.quantity > 0 ? styles.stockIn : styles.stockOut
          }
        >
          {sweet.quantity > 0 ? "In Stock" : "Out of Stock"}
        </p>
      </div>

      <div className={styles.footer}>
        <button
          className={styles.button}
          disabled={sweet.quantity === 0}
          onClick={handlePurchase}
        >
          Purchase
        </button>

        {/* Admin-only actions */}
        {user?.role === "admin" && (
          <AdminSweetActions sweet={sweet} />
        )}
      </div>
    </div>
  );
};

export default SweetCard;
