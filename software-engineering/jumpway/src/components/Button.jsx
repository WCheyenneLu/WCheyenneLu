import styles from "./Button.module.css";
import { Link } from "react-router-dom";

function Button({ children, link, mode }) {
  return (
    <Link to={link}>
      <button
        className={styles.button}
        style={{
          backgroundColor: `${mode === "dark" ? "#eb7133" : ""}`,
        }}
      >
        <p style={{ color: `${mode === "dark" ? "#f7f7f7" : ""}` }}>
          {children}
        </p>
      </button>
    </Link>
  );
}

export default Button;
