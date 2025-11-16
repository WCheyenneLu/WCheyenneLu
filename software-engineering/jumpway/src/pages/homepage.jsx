import PageNav from "../components/PageNav";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Article from "../components/Article";
import Image from "../components/Image";
import "../index.css";
import styles from "./homepage.module.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

const aboutCard = [
  {
    id: "about-us",
    title: "ABOUT US",
    text1:
      "We provide excellent product design and production technology to achieve three major requirements: high quality and low cost products, on-time delivery, as well as a safe and rewarding working environment. We are a 100% foreign capital factory (B.O.I factory) established since 1989, specializing in tooling, stamping and plastic injection molding. We are ready to serve all domestic and overseas customers and deliver your order with care.",
    text2:
      "JUMPWAY has been certified with ISO-9001, ISO-14001, and IATF-16949, recognised by its efficient process capabilities, ever-improving services, and high quality product.",
  },
  {
    id: "our-team",
    title: "OUR TEAM",
    text1:
      "Jumpway was founded by Mr. Sheng-Yi Lu and Mrs. Hsiao-Ching Chi Lu. Currently, Jumpway's management team includes Mr. Chi-Hsien Lu, Mrs. Yi-Hung Chen and many more.",
    text2:
      "At Jumpway, we place employee well-being and happiness at the core of our values.",
  },
  {
    id: "our-story",
    title: "OUR STORY",
    text1:
      "Our company was first founded in 1989 by Mr. Sheng Yi Lu and Mrs. Hsiao-Ching Chi Lu who moved from Taiwan to start their buisness here, starting off specializing in ___. Since then, Jumpway has grown to have ___ employees today, serving international customers from China, ______, and many more.",
    text2:
      "JUMPWAY hopes to continue to grow and become a company recognized for its efficiency, quality, and dependibility",
  },
];
const serviceCard = [
  {
    id: "services/service1",
    name: "Prototype Developement",
    info: "NCT Stamping, along with Laser and Wire Cutting are our company's newer services, thrusting our company to a new competitive level. Ex. example 1, example 2, ",
    img: "./photos/Prototype3.PNG",
  },
  {
    id: "services/service2",
    name: "Mold Developement",
    info: "nothing yet",
    img: "./photos/Mold1.jpg",
  },
  {
    id: "services/service3",
    name: "NCT Stamping & Laser",
    info: "also nothing yet",
    img: "./photos/NCT1.jpg",
  },
  {
    id: "services/service4",
    name: "Stamping",
    info: "also nothing yet",
    img: "./photos/Stamping3.jpg",
  },
  {
    id: "services/service5",
    name: "Plastic Injection",
    info: "also nothing yet",
    img: "./photos/Injection1.jpg",
  },
  {
    id: "services/service6",
    name: "Painting",
    info: "also nothing yet",
    img: "./photos/Painting2.jpg",
  },
  {
    id: "services/service7",
    name: "CNC Lathe",
    info: "also nothing yet",
    img: "./photos/CNC1.jpg",
  },
  {
    id: "services/service8",
    name: "Assembly",
    info: "also nothing yet",
    img: "./photos/Assembly1.jpg",
  },
];
const industryCard = [
  {
    name: "Automotive",
    icon: "./photos/Icon1.png",
    description:
      "A little bit of description of detailed involvement in this industry",
  },
  {
    name: "Telecommunication",
    icon: "./photos/Icon2.png",
    description:
      "A little bit of description of detailed involvement in this industry",
  },
  {
    name: "Cabinets/ Racks",
    icon: "./photos/Icon3.png",
    description:
      "A little bit of description of detailed involvement in this industry",
  },
  {
    name: "Power Supply",
    icon: "./photos/Icon4.png",
    description:
      "A little bit of description of detailed involvement in this industry",
  },
];
const certificate = [
  { name: "IATF:16949", src: "./photos/Certificates/ISO_1.jpg", year: "2020" },
  { name: "ISOb", src: "./photos/Certificates/ISO_2.jpg", year: "2021" },
  { name: "ISOc", src: "./photos/Certificates/ISO_3.jpg", year: "2022" },
  { name: "other", src: "./photos/Certificates/other.jpg", year: "2023" },
];
export default function Homepage({ setService }) {
  const [currentAboutCard, setCurrentAboutCard] = useState(0);
  const [currentServiceCard, setCurrentServiceCard] = useState(0);
  const [hovered, setHovered] = useState(10);
  //pass into serviceCard

  function handleChangeAbout(slide) {
    setCurrentAboutCard(slide);
    setHovered(slide);
  }
  function handleChangeService(slide) {
    setCurrentServiceCard(slide);
  }

  return (
    <div className={styles.homepage}>
      <ScrollToTop />
      <PageNav />
      <section className="hero" style={{ height: "34rem" }}>
        <div className={styles.heroText}>
          <span>
            <h1>PRECISION.</h1>
          </span>
          <span>
            <h1>DEPENDABILITY. </h1>
          </span>
          <span>
            <h1 style={{ whiteSpace: "nowrap" }}>FROM START TO FINISH.</h1>
          </span>
        </div>
        <div
          className="imgContainer"
          style={{
            position: "absolute",
            width: "27%",
            height: "20rem",
            top: "4rem",
            right: "40%",
          }}
        >
          <Image src="./photos/homeHero1.png" />
        </div>
        <div
          className="imgContainer"
          style={{
            position: "absolute",
            width: "27%",
            height: "20rem",
            bottom: "-3rem",
            right: "10%",
            zIndex: "2",
          }}
        >
          <Image src="./photos/homeHero2.png" />
        </div>
      </section>
      <section className={styles.aboutUs}>
        <div className={styles.leftContainer}>
          <div
            className={styles.line}
            style={{
              left: `${
                hovered === 1 ? "9rem" : hovered === 2 ? "18rem" : "0rem"
              }`,
            }}
          ></div>
          <ul>
            <li>
              <span onClick={() => handleChangeAbout(0)}>About Us</span>
            </li>
            <li>
              <span onClick={() => handleChangeAbout(1)}>Our Team</span>
            </li>
            <li>
              <span onClick={() => handleChangeAbout(2)}>Our Story</span>
            </li>
          </ul>
          <AboutCard title="About Us" currentAboutCard={currentAboutCard} />
          <br />
          <br />
          <br />
          <Button link="/about">Read More</Button>
        </div>
        {/* <div className={styles.rightContainer}>
          <img src="./photos/homepageHero.jpg" />
        </div> */}
      </section>
      <div className={styles.ourServicesContainer}>
        <div className={styles.imgContainer}>
          <div className={styles.imgContainerCrop}>
            <img src="photos/HomeService.png" />
          </div>
          <div className={styles.headerbg}></div>
        </div>
        <img className={styles.outline} src="./photos/ServiceXray.png" />
        <section className={styles.ourServices}>
          <h2>OUR SERVICES</h2>
          <p>
            We always ensure our services are carried out with proficiency and
            quality to satisfy our clients.
          </p>
          <div className={styles.content}>
            <ServiceCard cardId={0} onClick={() => setService(0)} />
            <ServiceCard cardId={1} onClick={() => setService(1)} />
            <ServiceCard cardId={2} />
            <ServiceCard cardId={3} />
            <ServiceCard cardId={4} />
            <ServiceCard cardId={5} />
            <ServiceCard cardId={6} />
            <ServiceCard cardId={7} />
          </div>
        </section>
      </div>
      <section className={styles.ourQualifications}>
        <div className={styles.leftContainer}>
          <h2>Our Qualifications</h2>
          <div>
            <p>
              We are qualified in our services having recieved certification for
              blank blank blank as welll as blank blank blank and blank blank
              blank.
            </p>
            <p>
              More information about our qualifications to be entered in here
              but for now this is filler text.{" "}
            </p>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <Certificate number={0} />
          <Certificate number={1} />
          <Certificate number={2} />
          <Certificate number={3} />
        </div>
      </section>
      <section className={styles.industriesServed}>
        <div className={styles.leftContainer}>
          <h2>Industries Served</h2>
          <br />
          <div className={styles.industryCardRow}>
            <IndustryCard industry={0} />
            <IndustryCard industry={1} />
          </div>
          <br />
          <div
            className={styles.industryCardRow}
            /* style={{ marginLeft: "3rem" }} */
          >
            <IndustryCard industry={2} />
            <IndustryCard industry={3} />
          </div>
        </div>
        <div className={styles.rightContainer}>
          <iframe
            id="homeVideo"
            src="https://www.youtube.com/embed/mnTb-nb0oVs"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          />
        </div>
      </section>
      <section className={styles.recentArticles}>
        <h2>Recent Articles</h2>
        <div className={styles.articles}>
          <div className={styles.leftContainer}>
            <Article left={1} perRow={1} />
          </div>
          <div className={styles.rightContainer}>
            <Article left={0} perRow={2} />
            <Article left={0} perRow={2} />
            <Article left={0} perRow={2} />
            <Article left={0} perRow={2} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function AboutCard({ currentAboutCard }) {
  return (
    <div className={styles.aboutCard}>
      <h2>{aboutCard[currentAboutCard].title}</h2>
      <p>{aboutCard[currentAboutCard].text1}</p>
      <p>{aboutCard[currentAboutCard].text2}</p>
    </div>
  );
}
function ServiceCard({ cardId }) {
  const [hoveredService, setHoveredService] = useState(10);
  function handleMouseEnter(cardId) {
    setHoveredService(cardId);
  }
  function handleMouseLeave() {
    setHoveredService(10);
  }
  return (
    <NavLink to="/services" style={{ textDecoration: "none" }}>
      <div
        className={`${
          cardId % 2 === 0 ? styles.serviceCard : styles.serviceCardoffsetY
        }`}
        onMouseEnter={() => handleMouseEnter(cardId)}
        onMouseLeave={() => handleMouseLeave()}
      >
        <div
          className={styles.information}
          style={{
            transform: `${
              hoveredService === cardId ? "translate(0)" : "translate(0,11rem)"
            }`,
          }}
        >
          <h4>{serviceCard[cardId].name}</h4>
          <p>
            This is some text to breifly descibe this area of service by Jumpway
          </p>
        </div>
        <Image
          src={serviceCard[cardId].img}
          hovered={hoveredService === cardId ? true : false}
        />
      </div>
    </NavLink>
  );
}
function Certificate({ number }) {
  return (
    <div className={styles.certificateContainer}>
      <div className={styles.image}>
        <img src={certificate[number].src} style={{ height: "97%" }} />
      </div>
      <p>
        <b>{certificate[number].name}</b>
        <br />
        {certificate[number].year}
      </p>
    </div>
  );
}
function IndustryCard({ industry }) {
  return (
    <div className={styles.industryCard}>
      <div className={styles.icon}>
        <img
          src={industryCard[industry].icon}
          style={{ width: `${industry == 2 ? "70%" : "100%"}` }}
        />
      </div>
      <div
        style={{
          backgroundColor: "#eb7133",
          width: "3px",
          height: "85%",
          marginLeft: "1rem",
        }}
      ></div>
      <div className={styles.textbox}>
        <div className={styles.title}>
          <h4>
            0{industry} &#13;
            {industryCard[industry].name}
          </h4>
        </div>
      </div>
    </div>
  );
}
/* function Article({ left }) {
  return (
    <div className={`${styles.article} ${left === 1 ? `${styles.left}` : ""}`}>
      <div
        className={`${styles.image} ${left === 1 ? `${styles.left}` : ""}`}
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
} */
