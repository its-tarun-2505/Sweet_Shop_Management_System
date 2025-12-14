import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { logout } from "../../features/auth/authSlice";
import styles from "../../stylesheet/Navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
    navigate("/login");
  };

  // Close menu on resize (UX polish)
  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, []);

  return (
    <header className={styles.navbar}>
      {/* Brand */}
      <div className={styles.brand} onClick={() => navigate("/sweets")}>
        Sweet<span>Shop</span>
      </div>

      {/* Desktop Navigation */}
      <nav className={styles.desktopNav}>
        {token && <Link to="/sweets">Sweets</Link>}
        {user?.role === "admin" && <Link to="/admin">Admin</Link>}
      </nav>

      {/* Desktop Auth */}
      <div className={styles.desktopAuth}>
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className={styles.primaryBtn}>
              Sign up
            </Link>
          </>
        ) : (
          <>
            <span className={styles.user}>
              {user?.name} ({user?.role})
            </span>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>

      {/* Hamburger */}
      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
      >
        <span className={menuOpen ? styles.open : ""}></span>
        <span className={menuOpen ? styles.open : ""}></span>
        <span className={menuOpen ? styles.open : ""}></span>
      </button>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.show : ""}`}>
        {token && <Link to="/sweets" onClick={() => setMenuOpen(false)}>Sweets</Link>}
        {user?.role === "admin" && (
          <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>
        )}

        <div className={styles.divider} />

        {!token ? (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/register" onClick={() => setMenuOpen(false)}>Sign up</Link>
          </>
        ) : (
          <>
            <span className={styles.mobileUser}>
              {user?.name} ({user?.role})
            </span>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
