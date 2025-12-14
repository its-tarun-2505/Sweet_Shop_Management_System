import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import { getMe } from "../../features/auth/authController";
import styles from "../../stylesheet/Layout.module.css";


const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  // Fetch logged-in user details on refresh
  useEffect(() => {
    if (token && !user) {
      dispatch(getMe());
    }
  }, [token, user, dispatch]);

  return (
    <div className={styles.appShell}>
      <Navbar />

      {/* Page content rendered here */}
      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default Layout;
