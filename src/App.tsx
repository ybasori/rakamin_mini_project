import React from "react";
import Modal from "./components/atoms/Modal/Modal";
import CreateGroup from "./components/molecules/CreateGroup/CreateGroup";

function App() {
  return (
    <>
      <Modal onClose={() => null}>
        <CreateGroup />
      </Modal>
    </>
  );
}

export default App;
