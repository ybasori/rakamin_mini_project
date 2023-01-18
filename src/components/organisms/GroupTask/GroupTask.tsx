import React, { useState } from "react";
import Label from "../../atoms/Label/Label";
import Task from "../../molecules/Task/Task";
import styles from "./GroupTask.module.scss";
import plus from "../../../assets/images/plus.png";
import Modal from "../../atoms/Modal/Modal";
import CreateEditTask from "../../molecules/CreateEditTask/CreateEditTask";

const GroupTask: React.FC<{
  variant: "primary" | "warning" | "danger" | "success";
}> = ({ variant }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className={`${styles["container"]} ${styles[variant]}`}>
        <Label variant={variant}>Group Task 1</Label>
        <div className={styles["date"]}>January - March</div>
        <div className={styles["tasks-list"]}>
          <Task />
          <Task />
          <Task />
        </div>
        <div className={styles["add-new"]} onClick={() => setOpenModal(true)}>
          <img className={styles["plus"]} src={plus} alt="" loading="lazy" />
          <div className={styles["text"]}>New Task</div>
        </div>
      </div>

      {openModal && (
        <Modal onClose={() => setOpenModal(false)}>
          <CreateEditTask onClose={() => setOpenModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default GroupTask;
