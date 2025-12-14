import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../features/auth/authController";
import InputField from "../UI/InputField";
import styles from "../../stylesheet/auth.module.css";

/**
 * RegisterForm
 * Handles user registration UI and state
 */
const RegisterForm = () => {
  const dispatch = useDispatch();
  const { message, isLoading } = useSelector((state) => state.auth);

  // Local form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  // Update state on input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit register request
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <div className={styles.authWrapper}>
      <div className={styles.authCard}>
        <h2 className={styles.title}>Create Account</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <InputField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />

          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <InputField
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Enter role"
          />

          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
          />

          {/* Backend message */}
          {message && <p className={styles.message}>{message}</p>}

          <button
            type="submit"
            className={styles.button}
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
