import PageNav from "../components/PageNav";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import "../index.css";
import styles from "./services.module.css";
import { useState } from "react";

const serviceCard = [
  {
    title: "Service Title",
    desc1:
      "Prototyping is a cruicial step in the creation of all new products. Our technologies can assist in efficiently manufacturing prototypes for customers to optimizing this part of the process. Upon reviewal of the prototype, customers can again adjust their designs accordingly. Through this feeback cycle, we can swiftly provide our customer with their ideal prototype",
    desc2:
      "By using NCT, Laser Cut and Wire Cut, we can finish our samples and products much faster. This improvement enables greater customer convenience when re-engineering on checking t",
    desc3:
      "Reviewing our customer's designs and drafts, we will provide suitable feedback and adjustments on the feasibility of the prototypes.",
    img: "./photos/homepageHero.jpg",
  },
  {
    title: "Service Title 2",
    desc1:
      "Prototyping is a cruicial step in the creation of all new products. Our technologies can assist in efficiently manufacturing prototypes for customers to optimizing this part of the process. Upon reviewal of the prototype, customers can again adjust their designs accordingly. Through this feeback cycle, we can swiftly provide our customer with their ideal prototype",
    desc2:
      "By using NCT, Laser Cut and Wire Cut, we can finish our samples and products much faster. This improvement enables greater customer convenience when re-engineering on checking t",
    desc3:
      "Reviewing our customer's designs and drafts, we will provide suitable feedback and adjustments on the feasibility of the prototypes.",
    img: "./photos/homepageHero.jpg",
  },
  {
    title: "Service Title 3",
  },
  {
    title: "Service Title 4",
  },
  {
    title: "Service Title 5",
  },
  {
    title: "Service Title 6",
  },
  {
    title: "Service Title 7",
  },
  {
    title: "Service Title 8",
  },
  {
    title: "Service Title 9",
  },
  {
    title: "Service Title 10",
  },
];
const policies = [
  {
    title: "Quality Policy Title 1",
    text: "This is a numbered list with a comprehensive but brief summary of each of the company's quality policies and how it achieves this.",
  },
  {
    title: "Quality Policy Title 2",
    text: "This is a numbered list with a comprehensive but brief summary of each of the company's quality policies and how it achieves this.",
  },
  {
    title: "Quality Policy Title 3",
    text: "This is a numbered list with a comprehensive but brief summary of each of the company's quality policies and how it achieves this.",
  },
];
function Services({ displayedService }) {
  /*   const defaultService = Number({ displayedService }); */
  const [currentService, setCurrentService] = useState(0);
  function handleNext() {
    if (currentService < 9) setCurrentService((c) => c + 1);
  }
  function handlePrevious() {
    if (currentService > 0) setCurrentService((c) => c - 1);
  }
  return (
    <div>
      <PageNav />
      <section className="hero">
        <Hero image="./photos/homepageHero.jpg">Our Services</Hero>
      </section>
      <section className={styles.services}>
        <div className={styles.servicesContainer}>
          <ServiceTile serviceNo={0} onSetCurrentService={setCurrentService} />

          <ServiceTile serviceNo={1} onSetCurrentService={setCurrentService} />

          <ServiceTile serviceNo={2} onSetCurrentService={setCurrentService} />

          <ServiceTile serviceNo={3} onSetCurrentService={setCurrentService} />

          <ServiceTile serviceNo={4} onSetCurrentService={setCurrentService} />

          <ServiceTile serviceNo={5} onSetCurrentService={setCurrentService} />

          <ServiceTile serviceNo={6} onSetCurrentService={setCurrentService} />

          <ServiceTile serviceNo={7} onSetCurrentService={setCurrentService} />

          <ServiceSlide service={currentService} />
          <button onClick={handlePrevious} className={styles.leftArrow}>
            &lt;
          </button>
          <button onClick={handleNext} className={styles.rightArrow}>
            &gt;
          </button>
        </div>
      </section>
      <section className={styles.qualityPolicies}>
        <div className={styles.leftContainer}>
          <h2> Quality Policies</h2>
          <Policy policy={0} />
          <Policy policy={1} />
          <Policy policy={2} />
        </div>
        <div className={styles.rightContainer}></div>
      </section>
      <Footer />
    </div>
  );
}

function ServiceTile({ serviceNo, onSetCurrentService }) {
  return (
    <div
      className={styles.serviceTile}
      onClick={() => onSetCurrentService(serviceNo)}
    >
      <p>{serviceCard[serviceNo].title}</p>
    </div>
  );
}
function ServiceSlide({ service }) {
  return (
    <div className={styles.serviceSlide}>
      <div className={styles.leftContainer}>
        <h2>{serviceCard[service].title}</h2>
        <div className={styles.line}></div>
        <div className={styles.textbox}>
          <p>{serviceCard[service].desc1}</p>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.textbox} style={{ padding: 0 }}>
          <div
            className={styles.textbox}
            style={{ width: "50%", padding: "0 1rem" }}
          >
            <p>{serviceCard[service].desc2}</p>
          </div>
          <div
            className={styles.textbox}
            style={{ width: "50%", padding: "0 1rem" }}
          >
            <p>{serviceCard[service].desc3}</p>
          </div>
        </div>
        <div className={styles.image}>
          <img src={serviceCard[service].img} />
        </div>
      </div>
    </div>
  );
}
export default Services;

function Policy({ policy }) {
  return (
    <div className={styles.policy}>
      <div className={styles.circle}>
        <p>0{policy + 1}</p>
      </div>
      <div className={styles.textbox}>
        <p>
          <b>{policies[policy].title}</b>
          <br />
          {policies[policy].text}
        </p>
      </div>
    </div>
  );
}

{
  /* <section className={styles.ourServices}>
        <div className="v-w-line" style={{ height: "53.1rem" }}></div>
        <div
          className="circle"
          style={{
            backgroundColor: "#f7f7f7",
            left: "2.8rem",
            bottom: "44.3rem",
          }}
        ></div>
        <div className={styles.content}>
          <h2>OUR SERVICES</h2>
          <div className={styles.serviceSlides}>
            <div className={styles.column}>
              <ServiceLabel onChangeSlide={handleChangeService} thisSlide={0}>
                Service Name 1
              </ServiceLabel>
              <ServiceLabel onChangeSlide={handleChangeService} thisSlide={1}>
                Service Name 2
              </ServiceLabel>
              <ServiceLabel onChangeSlide={handleChangeService} thisSlide={2}>
                Service Name 3
              </ServiceLabel>
              <ServiceLabel onChangeSlide={handleChangeService} thisSlide={3}>
                Service Name 4
              </ServiceLabel>
              <ServiceLabel onChangeSlide={handleChangeService} thisSlide={4}>
                Service Name 5
              </ServiceLabel>
              <ServiceLabel onChangeSlide={handleChangeService} thisSlide={5}>
                Service Name 6
              </ServiceLabel>
              <ServiceLabel onChangeSlide={handleChangeService} thisSlide={6}>
                Service Name 7
              </ServiceLabel>
              <ServiceLabel onChangeSlide={handleChangeService} thisSlide={7}>
                Service Name 8
              </ServiceLabel>
              <ServiceLabel onChangeSlide={handleChangeService} thisSlide={8}>
                Service Name 9
              </ServiceLabel>
              <ServiceLabel onChangeSlide={handleChangeService} thisSlide={9}>
                Service Name 10
              </ServiceLabel>
            </div>
            <div className={styles.column}>
              <ServiceInfo currentServiceCard={currentServiceCard} />
            </div>
            <div
              className={styles.image}
              style={{
                backgroundImage: `url(${serviceCard[currentServiceCard].img})`,
              }}
            ></div>
          </div>
        </div>
      </section> */
  /* function ServiceLabel({ onChangeSlide, children, thisSlide }) {
  return (
    <div
      className={styles.serviceLabel}
      onClick={() => onChangeSlide(thisSlide)}
    >
      <h4>{children}</h4>
    </div>
  );
}
function ServiceInfo({ currentServiceCard }) {
  return (
    <div className={styles.serviceInfo}>
      <p>{serviceCard[currentServiceCard].info}</p>
      <Button link="/services">View All Services</Button>
    </div>
  );
} */
}
