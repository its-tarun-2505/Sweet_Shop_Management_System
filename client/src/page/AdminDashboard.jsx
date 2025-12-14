import SweetsContainer from "../components/sweets/SweetsContainer";
import AdminSweetForm from "../components/admin/AdminSweetForm";
import styles from "../stylesheet/AdminDashboard.module.css";

const AdminDashboard = () => {
  return (
    <div className={styles.page}>
      {/* Page header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Admin Dashboard</h1>
        <p className={styles.subtitle}>
          Manage sweets inventory and pricing.
        </p>
      </div>

      {/* Main content grid */}
      <div className={styles.grid}>
        {/* Add new sweet form */}
        <AdminSweetForm />

        {/* Sweets listing */}
        <section className={styles.card}>
          <h2>All Sweets</h2>
          <SweetsContainer />
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
