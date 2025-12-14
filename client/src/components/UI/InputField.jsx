import styles from "../../stylesheet/InputField.module.css";

const InputField = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  ...rest
}) => {
  return (
    <div className={styles.inputField}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {rest.required && <sup className={styles.required}>*</sup>}
        </label>
      )}

      <input
        className={styles.input}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

export default InputField;
