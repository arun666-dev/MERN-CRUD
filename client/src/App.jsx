import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";
import { Register } from "./components/Register";
import { Routes, Route } from "react-router-dom";
import { Edit } from "./components/Edit";
import { Detail } from "./components/Detail";

function App() {
  return (
    <>
      <Navbar />{" "}
      <Routes>
        <Route path="/" element={<Home />} />{" "}
        <Route path="register" element={<Register />} />{" "}
        <Route path="edit/:id" element={<Edit />} />{" "}
        <Route path="view/:id" element={<Detail />} />{" "}
      </Routes>{" "}
    </>
  );
}

export default App;
