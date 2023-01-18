import React from "react";
import Modal from "./components/atoms/Modal/Modal";
import CreateTask from "./components/molecules/CreateEditTask/CreateEditTask";

function App() {
  return (
    <>
      <Modal onClose={() => null}>
        <CreateTask />
      </Modal>
    </>
  );
}

export default App;
