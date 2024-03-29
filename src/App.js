import './App.css';
import Routes from './routes/Routes';
import Modal from "./components/Modal/Modal.js";

import { useState } from "react";


function App() {

  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState("")

  return (
    <div className="App">
      {showModal && <Modal setShowModal={setShowModal} modalMessage={modalMessage}/>}
      <Routes setShowModal={setShowModal} setModalMessage={setModalMessage}/>
    </div>
  );
}

export default App;
