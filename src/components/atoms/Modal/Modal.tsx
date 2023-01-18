import React from "react";
import styles from "./Modal.module.scss";

const Modal: React.FC<{
  children: React.ReactNode;
  onClose: () => void;
}> = ({ children, onClose }) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["bg"]} onClick={onClose}></div>
      <div className={styles["wrap"]}>{children}</div>
    </div>
  );
};

export default Modal;
