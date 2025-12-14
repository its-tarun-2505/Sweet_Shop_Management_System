import styles from "../../stylesheet/Sweet.module.css";

const SweetFilters = ({ filters, categories, onChange, onApply }) => {
  return (
    <div className={styles.filtersBar}>
      <input
        className={styles.input}
        name="name"
        placeholder="Search sweet"
        value={filters.name}
        onChange={onChange}
      />

      <select
        className={styles.select}
        name="category"
        value={filters.category}
        onChange={onChange}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        className={styles.input}
        type="number"
        name="minPrice"
        placeholder="Min Price"
        value={filters.minPrice}
        onChange={onChange}
      />

      <input
        className={styles.input}
        type="number"
        name="maxPrice"
        placeholder="Max Price"
        value={filters.maxPrice}
        onChange={onChange}
      />

      <button className={styles.button} onClick={onApply}>
        Apply
      </button>
    </div>
  );
};

export default SweetFilters;
