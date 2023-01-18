import React from "react";
import styles from "./DeleteTask.module.scss";
import close from "../../../assets/images/close.png";
import Button from "../../atoms/Button/Button";
import exclamation from "../../../assets/images/exclamation.png";

const DeleteTask: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <img
          className={styles["exclamation"]}
          src={exclamation}
          alt=""
          loading="lazy"
        />
        <div className={styles["title"]}>Delete Task</div>
        <div className={styles["close"]} onClick={onClose}>
          <img src={close} loading="lazy" alt="" />
        </div>
      </div>
      <div className={styles["body"]}>
        <div className={styles["text"]}>
          Are you sure want to delete this task? your action can’t be reverted.
        </div>
      </div>
      <div className={styles["footer"]}>
        <div className={styles["action-button"]}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="danger" onClick={() => null}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTask;
