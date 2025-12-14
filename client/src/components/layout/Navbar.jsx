import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import styles from "../../stylesheet/Navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  // Clear auth state and redirect to login
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className={styles.navbar}>
      {/* Brand logo / app name */}
      <div className={styles.brand} onClick={() => navigate("/sweets")}>
        Sweet Shop
      </div>

      {/* Navigation links */}
      <nav className={styles.links}>
        {token && <Link to="/sweets">Sweets</Link>}
        {user?.role === "admin" && <Link to="/admin">Admin</Link>}
      </nav>

      {/* Auth actions */}
      <div className={styles.auth}>
        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className={styles.primaryBtn}>
              Sign up
            </Link>
          </>
        )}

        {token && (
          <>
            <span className={styles.user}>
              {user ? `${user.name} (${user.role})` : "Loading..."}
            </span>

            <button
              className={styles.ghostBtn}
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
