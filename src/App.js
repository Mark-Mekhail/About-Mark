import React, { useRef } from "react";

// Required components
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

/**
 * The main component of the application.
 * @returns {JSX.Element} The rendered App component.
 */
export default function App() {
  const refs = {
    aboutRef: useRef(null),
    experienceRef: useRef(null),
    skillsRef: useRef(null),
    projectsRef: useRef(null),
  }

  return (
    <div id="react-app">
      <Header {...refs} />
      <Body {...refs} />
      <Footer />
    </div>
  );
};
