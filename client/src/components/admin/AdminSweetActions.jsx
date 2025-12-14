import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteSweetById, updateSweetById, restockSweetById } from "../../features/sweetShop/shopController";
import styles from "../../stylesheet/AdminSweetFormActions.module.css";


const AdminSweetActions = ({ sweet }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  // Local editable copy of sweet data
  const [localData, setLocalData] = useState({
    name: sweet.name,
    category: sweet.category,
    price: sweet.price,
    quantity: sweet.quantity,
    unit: sweet.unit,
  });

  // Update local state while editing
  const handleChange = (e) => {
    setLocalData({ ...localData, [e.target.name]: e.target.value });
  };

  // Save updated data
  const handleSave = () => {
    dispatch(
      updateSweetById({
        id: sweet._id,
        data: {
          ...localData,
          price: Number(localData.price),
          quantity: Number(localData.quantity),
        },
      })
    );
    setIsEditing(false);
  };

  // Delete sweet
  const handleDelete = () => {
    if (window.confirm("Delete this sweet?")) {
      dispatch(deleteSweetById(sweet._id));
    }
  };

  // Restock sweet quantity
  const handleRestock = () => {
    const amount = Number(prompt("Restock quantity", "10"));
    if (!amount || amount <= 0) return;

    dispatch(restockSweetById({ id: sweet._id, quantity: amount }));
  };

  if (isEditing) {
    return (
      <div className={`${styles.actions} ${styles.editing}`}>
        <input className={styles.input} name="name" value={localData.name} onChange={handleChange} />
        <input className={styles.input} name="price" type="number" value={localData.price} onChange={handleChange} />
        <input className={styles.input} name="quantity" type="number" value={localData.quantity} onChange={handleChange} />

        <button className={`${styles.button} ${styles.primary}`} onClick={handleSave}>
          Save
        </button>
        <button className={styles.button} onClick={() => setIsEditing(false)}>
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className={styles.actions}>
      <button className={styles.button} onClick={() => setIsEditing(true)}>
        Edit
      </button>
      <button className={`${styles.button} ${styles.danger}`} onClick={handleDelete}>
        Delete
      </button>
      <button className={`${styles.button} ${styles.secondary}`} onClick={handleRestock}>
        Restock
      </button>
    </div>
  );
};

export default AdminSweetActions;
