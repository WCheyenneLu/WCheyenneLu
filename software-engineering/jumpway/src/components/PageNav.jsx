import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styles from "./PageNav.module.css";

function PageNav() {
  const [isScrollUp, setIsScrollUp] = useState(true);

  var prevScrollpos = window.pageYOffset;
  window.addEventListener(
    "scroll",
    function () {
      console.log("running");
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        setIsScrollUp(true);
      } else {
        setIsScrollUp(false);
      }
      prevScrollpos = currentScrollPos;
    },
    false
  );

  return (
    <div>
      <nav
        className={styles.nav}
        style={{ transform: `${!isScrollUp ? "translateY(-6rem)" : ""}` }}
      >
        <NavLink style={{ textDecoration: "none" }} to="/homepage">
          <h3>Jumpway</h3>
        </NavLink>
        <ul>
          <li>
            <NavLink style={{ textDecoration: "none" }} to="/services">
              <div>
                <h4>SERVICES</h4>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink style={{ textDecoration: "none" }} to="/about">
              <div>
                <h4>ABOUT</h4>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink style={{ textDecoration: "none" }} to="/blog">
              <div>
                <h4>BLOG</h4>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink style={{ textDecoration: "none" }} to="/contact">
              <div>
                <h4>CONTACT</h4>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default PageNav;
