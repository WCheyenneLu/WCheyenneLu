import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import styles from "./about.module.css";
import Line from "../components/Line";
import Button from "../components/Button";

function about() {
  return (
    <div>
      <PageNav />
      <section className="hero">
        <Hero image="./photos/homepageHero.jpg">ABOUT US</Hero>
      </section>
      <section className={styles.whoWeAre}>
        <div className={styles.leftContainer}>
          <h2>Who We Are</h2>
          <Line width={"30%"} color={"#f7f7f7"} />
          <div className={styles.textbox}>
            <p>
              We provide excellent product design and production technology to
              achieve three major requirements: high quality and low cost
              products, on-time delivery, as well as a safe and rewarding
              working environment.
              <br />
              <br />
              JUMPWAY is a 100% foreign capital factory (B.O.I factory)
              established in 1989, under the policy of the Thai Government to
              encourage foreign companies to invest in Thailand. We specialize
              in tooling, stamping and plastic injection molding, but provide
              many other services as well.
            </p>
          </div>
        </div>
        <div className={styles.rightContainer}></div>
      </section>
      <section className={styles.ourTeam}>
        <h2>Our Leadership Team</h2>
        <Profile />
        <Profile />
        <Profile />
        <Profile />
      </section>
      <section className={styles.vacancies}>
        <div className={styles.leftContainer}>
          <h2>Interested in joining our team?</h2>
          <Button
            mode={"dark"}
            link={"https://www.jobthai.com/th/company/72623"}
          >
            View on JobThai
          </Button>
        </div>
        <div className={styles.rightContainer}></div>
      </section>
      <section className={styles.ourStory}>
        <h2>Our Story</h2>
        <div className={styles.timeline}>
          <div className={styles.line}>
            <h2>&gt;</h2>
          </div>
          <StoryCard />
          <StoryCard />
          <StoryCard />
          <StoryCard />
          <StoryCard />
        </div>
      </section>
      <Footer />
    </div>
  );
}

function Profile({ profileIndex }) {
  return (
    <div className={styles.profile}>
      <div className={styles.nameAndPosition}>
        <h4>
          FULL NAME <br /> Position at Jumpway
        </h4>
      </div>
    </div>
  );
}
function StoryCard() {
  return (
    <div className={styles.storyCard}>
      <h3>DATE</h3>
      <div className={styles.circle}></div>
      <div className={styles.image}></div>
      <div className={styles.textbox}>
        <p>
          This is some description about the occurences of the event at this
          point in time.{" "}
        </p>
      </div>
    </div>
  );
}

export default about;
