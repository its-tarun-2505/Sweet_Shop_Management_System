import SweetCard from "./SweetCard";
import styles from "../../stylesheet/Sweet.module.css";

const SweetGrid = ({ sweets }) => {
  return (
    <div className={styles.grid}>
      {sweets.map((sweet) => (
        <SweetCard key={sweet._id} sweet={sweet} />
      ))}
    </div>
  );
};

export default SweetGrid;
