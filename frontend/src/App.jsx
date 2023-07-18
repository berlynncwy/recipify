import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";
// import { AuthContextProvider } from "./context/AuthContext";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
