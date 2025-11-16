import PageNav from "../components/PageNav";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import styles from "./contact.module.css";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import ScrollToTop from "../components/ScrollToTop";

function contact() {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_6u5vlch",
        "template_owkivle",
        form.current,
        "P9z8JlkhEvVtLsNOr"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("Message Sent");
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div>
      <ScrollToTop />
      <PageNav />
      <section className="hero">
        <Hero image="./photos/homepageHero.jpg">Contact Us</Hero>
      </section>
      <section className={styles.contact}>
        <div className={styles.leftContainer}>
          <h2>Send Your Request</h2>
          <form ref={form} onSubmit={sendEmail}>
            <div className={styles.inputGroup}>
              <div className={styles.inputRow} style={{ width: "45%" }}>
                <label>
                  <p>Name</p>
                </label>
                <input
                  type="text"
                  name="from_name"
                  placeholder="First Last"
                  required
                />
              </div>
              <div className={styles.inputRow} style={{ width: "45%" }}>
                <label>
                  <p>Telephone</p>
                </label>
                <input
                  type="text"
                  name="phone_no"
                  placeholder="0123456789"
                  required
                />
              </div>
            </div>
            <div className={styles.inputRow}>
              <label>
                <p>Email</p>
              </label>
              <input
                type="text"
                name="email_id"
                placeholder="example@gmail.com"
                required
              />
            </div>
            <div className={styles.inputRow}>
              <label>
                <p>Message</p>
              </label>
              <textarea name="message" placeholder="How can we assist you?" />
            </div>
            <br />
            <br />
            <input
              className={styles.submit}
              type="submit"
              value="Submit Request"
            ></input>
          </form>
        </div>

        <div className={styles.rightContainer}></div>
      </section>
      <Footer />
    </div>
  );
}

export default contact;
