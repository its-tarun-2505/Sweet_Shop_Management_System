import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSweet } from "../../features/sweetShop/shopController";
import InputField from "../UI/InputField";
import styles from "../../stylesheet/AdminSweetFormActions.module.css";

const AdminSweetForm = () => {
  const dispatch = useDispatch();

  // Local form state
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    unit: "kg",
  });

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit new sweet
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addSweet({
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity),
      })
    );

    // Reset form after submission
    setForm({
      name: "",
      category: "",
      price: "",
      quantity: "",
      unit: "kg",
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Add Sweet</h2>

      <InputField label="Name" name="name" value={form.name} onChange={handleChange} required />
      <InputField label="Category" name="category" value={form.category} onChange={handleChange} required />
      <InputField label="Price" type="number" name="price" value={form.price} min="0" onChange={handleChange} required />
      <InputField label="Quantity" type="number" name="quantity" value={form.quantity} min="0" onChange={handleChange} required />
      {/* Unit Selection */}
      <div className={styles.unitSection}>
        <label className={styles.unitLabel}>Unit</label>

        <div className={styles.unitOptions}>
          <button
            type="button"
            className={`${styles.unitBtn} ${
              form.unit === "kg" ? styles.active : ""
            }`}
            onClick={() => setForm({ ...form, unit: "kg" })}
          >
            Kg
          </button>

          <button
            type="button"
            className={`${styles.unitBtn} ${
              form.unit === "piece" ? styles.active : ""
            }`}
            onClick={() => setForm({ ...form, unit: "piece" })}
          >
            Piece
          </button>
        </div>
      </div>

      <button className={styles.button} type="submit">
        Add Sweet
      </button>
    </form>
  );
};

export default AdminSweetForm;
