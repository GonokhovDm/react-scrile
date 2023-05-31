import React, {useState} from "react";

import Modal from "./Components/Modal";
import './style.scss';

function App() {

  const [modalActive, setModalActive] = useState(false);

  return (
    <div className="App">
      <main>
        <button className="show-modal" onClick={() => setModalActive(true)}>show modal</button>
      </main>

      <Modal modalActive={modalActive} setModalActive={setModalActive}/>
    </div>
  );
}

export default App;
