import React from "react";
import Modal from "./components/atoms/Modal/Modal";
import DeleteTask from "./components/molecules/DeleteTask/DeleteTask";

function App() {
  return (
    <>
      <Modal onClose={() => null}>
        <DeleteTask />
      </Modal>
    </>
  );
}

export default App;
