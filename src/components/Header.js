import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import PropTypes from "prop-types";

// Styles
import styles from "../styles/components/Header.module.css";

// Utils
import Variants from "../utils/Variants";
import { useWindowWidth, remToPx } from "../utils/Window";

// Required images
import mark from "../images/mark-portrait.jpeg";
import hamburger from "../images/hamburger.png";

const staggerVariants = Variants.staggerVariants(0.5, -1);
const barNavItemVariants = Variants.defaultVariants("-50vw");
const dropDownStaggerVariants = {
  ...Variants.staggerVariants(0.1),
  exit: {
    transition: {
      staggerDirection: -1,
      staggerChildren: 0.1,
    },
  },
};
const dropdownNavItemVariants = {
  ...Variants.defaultVariants("-10vw", 0, 0.5),
  exit: {
    opacity: 0,
    x: "-10vw",
    transition: {
      duration: 0.5,
    },
  },
};
const signatureItemVariants = Variants.defaultVariants("-100vw");

const scrollOffset = remToPx(5);
function scrollToSection(ref) {
  window.scrollTo({
    top: ref.current.offsetTop - scrollOffset,
    behavior: "smooth",
  });
}
const menuWidthThreshold = remToPx(60);

/**
 * Renders the header component.
 * @returns {JSX.Element} The rendered header component.
 */
export default function Header({
  aboutRef,
  experienceRef,
  skillsRef,
  projectsRef,
  ...props
}) {
  const navItems = [
    { ref: aboutRef, text: "About" },
    { ref: experienceRef, text: "Experience" },
    { ref: skillsRef, text: "Skills" },
    { ref: projectsRef, text: "Projects" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onLinkClick = (ref) => () => {
    setIsMenuOpen(false);
    scrollToSection(ref);
  };

  const windowWidth = useWindowWidth();

  return (
    <motion.header
      variants={staggerVariants}
      initial="initial"
      animate="animate"
      className={styles.header}
      {...props}
    >
      <div className={styles.nav}>
        {windowWidth <= menuWidthThreshold && (
          <motion.img
            variants={barNavItemVariants}
            animate="animate"
            src={hamburger}
            alt="menu icon"
            className={styles.icon}
            onClick={toggleMenu}
            role="menu-icon"
          />
        )}
        <AnimatePresence>
          {(windowWidth > menuWidthThreshold || isMenuOpen) && (
            <motion.div
              variants={isMenuOpen ? dropDownStaggerVariants : staggerVariants}
              exit="exit"
              className={styles["nav-items"]}
              style={{ flexDirection: isMenuOpen ? "column" : "row" }}
            >
              {navItems.map(({ ref, text }) => (
                <motion.h5
                  key={text}
                  variants={
                    isMenuOpen ? dropdownNavItemVariants : barNavItemVariants
                  }
                  className={styles["nav-item"]}
                  onClick={onLinkClick(ref)}
                  role="nav-item"
                >
                  {text}
                </motion.h5>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className={styles.signature}>
        <motion.img
          variants={signatureItemVariants}
          src={mark}
          alt="mark portrait"
          className={styles.icon}
        />
        <motion.h4 variants={signatureItemVariants}>Mark Mekhail</motion.h4>
      </div>
    </motion.header>
  );
}

Header.propTypes = {
  aboutRef: PropTypes.object.isRequired,
  experienceRef: PropTypes.object.isRequired,
  skillsRef: PropTypes.object.isRequired,
  projectsRef: PropTypes.object.isRequired,
};
