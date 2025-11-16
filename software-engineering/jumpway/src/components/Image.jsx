import styles from "./Image.module.css";

function Image({ src, hovered = false }) {
  return (
    <div className={styles.image} style={{ backgroundImage: `url(${src})` }}>
      <div
        className={styles.orangeMask}
        style={{ opacity: `${hovered ? "0%" : "30%"}` }}
      ></div>
    </div>
  );
}

export default Image;
