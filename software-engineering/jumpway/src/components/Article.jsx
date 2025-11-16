import styles from "./Article.module.css";

export default function Article({ left, perRow }) {
  return (
    <div
      className={`${styles.article} ${left === 1 ? `${styles.left}` : ""}`}
      style={{
        width: `${perRow === 2 ? "45%" : perRow === 1 ? "100%" : "30%"}`,
        height: `${perRow === 3 ? "15rem" : "10rem"}`,
      }}
    >
      <div
        className={`${styles.image} ${left === 1 ? `${styles.left}` : ""}`}
        style={{ height: `${perRow === 3 ? "60%" : "50%"}` }}
      ></div>
      <div className={styles.textbox}>
        <div className={styles.date}>
          <p>{left === 0 ? "DD/MM/YYYY" : "Date Published: DD/MM/YYYY"}</p>
        </div>
        <h4>Article Title Filler Text</h4>
        {left === 1 ? (
          <p>
            This is some article preview or summary about what this article may
            contain.
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
