import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Button from "../components/Button";
import styles from "./blog.module.css";
import Article from "../components/Article";
import ScrollToTop from "../components/ScrollToTop";

function blog() {
  return (
    <div>
      <ScrollToTop />
      <PageNav />
      <section className="hero">
        <Hero image="./photos/homepageHero.jpg">OUR BLOG</Hero>
      </section>
      <section className={styles.blog}>
        <Blogpost />
        <Blogpost />
        <Blogpost />
      </section>
      <Footer />
    </div>
  );
}

function Blogpost() {
  return (
    <div className={styles.blogpost}>
      <div className={styles.imgContainer}></div>
      <div className={styles.textbox}>
        <h2>Blogpost Title</h2>
        <h4>Published Date: DD/MM/YYYY</h4>
        <br />
        <p>
          Under the blazing Thailand heat, we marked the beginning of the
          traditional Thai New Year, welcoming it with traditional Songkran
          ceremonies, a refreshing splash of water, and happy smiles. Happy New
          Year!
        </p>
        <br />
        <br />
        <Button>Read More</Button>
      </div>
    </div>
  );
}

export default blog;
