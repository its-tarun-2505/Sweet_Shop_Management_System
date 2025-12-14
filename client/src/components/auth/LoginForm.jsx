import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authController";
import InputField from "../UI/InputField";
import styles from "../../stylesheet/auth.module.css";

/**
 * LoginForm
 * Handles login UI and authentication dispatch
 */
const LoginForm = () => {
  const dispatch = useDispatch();
  const { message, isLoading } = useSelector((state) => state.auth);

  // Login form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle login submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className={styles.authWrapper}>
      <div className={styles.authCard}>
        <h2 className={styles.title}>Welcome Back</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
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
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          {/* Backend response message */}
          {message && <p className={styles.message}>{message}</p>}

          <button
            type="submit"
            className={styles.button}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
