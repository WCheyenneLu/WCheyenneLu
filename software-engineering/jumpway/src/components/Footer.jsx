import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.column}>
        <div className={styles.logoContainer}>
          <h2>Jumpway</h2>
        </div>
        <div className={styles.information}>
          <h4>
            <b>Address:</b>
          </h4>
          <h4>1 Moo 1 Hom Sin, Bangpakong, Chachoengsao, Thailand 24180</h4>
        </div>
        <div className={styles.information}>
          <h4>
            <b>Hours:</b>
          </h4>
          <h4>8AM - 5PM (Indochina Time)</h4>
        </div>
      </div>
      <div
        style={{ transform: `translateY(5.5rem)` }}
        className={styles.column}
      >
        <div className={styles.information}>
          <Link to="/services" style={{ textDecoration: "none" }}>
            <h4>Our Services</h4>
          </Link>
        </div>
        <div className={styles.information}>
          <Link to="/about" style={{ textDecoration: "none" }}>
            <h4>About Us</h4>
          </Link>
        </div>
        <div className={styles.information}>
          <Link to="/blog" style={{ textDecoration: "none" }}>
            <h4>Our Blog</h4>
          </Link>
        </div>
        <div className={styles.information}>
          <Link to="/contact" style={{ textDecoration: "none" }}>
            <h4>Contact Us</h4>
          </Link>
        </div>
      </div>
      <div
        style={{ transform: `translateY(5.5rem)` }}
        className={styles.column}
      >
        <div className={styles.information}>
          <h4>Contact Information</h4>
        </div>
        <div className={styles.information}>
          <h4>
            <b>Email:</b> &nbsp;&nbsp; rungnapa@jumpway.co.th(EN/TH)
          </h4>
        </div>
        <div className={styles.information}>
          <h4>
            <b>Telephone (EN):</b> &nbsp;&nbsp; +66(0)83-1139025
          </h4>
        </div>
        <div className={styles.information}>
          <h4>
            <b>Telephone (TH):</b> &nbsp;&nbsp;+66(0)38-989-646 ext 203
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Footer;
