import { Route, Routes } from "react-router";
import "./App.css";
import { Header } from "./components/Header/Header";
import { RegistrationPage } from "./pages/RegistrationPage/RegistrationPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { HomePage } from "./pages/HomePage/HomePage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
