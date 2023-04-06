import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header/Header";
import HomePage from "./components/home/HomePage";
import LoginPage from "./components/auth/login/LoginPage";
import RegisterPage from "./components/auth/register/RegisterPage";

const App = () => {
  return (
    <>
      <Header />
      <div className="container">
        {/* <HomePage />
        <LoginPage /> */}
        <RegisterPage />
      </div>
    </>
  );
};

export default App;
