import styles from "./Hero.module.css";
import "../index.css";

function Hero({ image, children }) {
  return (
    <div className={styles.hero}>
      <div className={styles.heroMask}></div>
      <div className={styles.heroText}>
        <h1>{children}</h1>
      </div>
      <img src={image} />
    </div>
  );
}

export default Hero;
