import React, { useState } from "react";
import styles from "./CreateEditTask.module.scss";
import close from "../../../assets/images/close.png";
import InputField from "../../atoms/InputField/InputField";
import Button from "../../atoms/Button/Button";

const CreateTask: React.FC<{ edit?: boolean; onClose: () => void }> = ({
  edit = false,
  onClose,
}) => {
  const [form, setForm] = useState({
    name: "",
    progress: "",
  });
  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <div className={styles["title"]}>
          {edit ? "Edit Task" : "Create Task"}
        </div>
        <div className={styles["close"]} onClick={onClose}>
          <img src={close} loading="lazy" alt="" />
        </div>
      </div>
      <div className={styles["body"]}>
        <div className={styles["group"]}>
          <div className={`${styles["row"]} ${styles["label"]}`}>Task Name</div>
          <div className={styles["row"]}>
            <InputField
              placeholder="Type your Task"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.currentTarget.value })
              }
            />
          </div>
        </div>
        <div className={styles["group"]}>
          <div className={`${styles["row"]} ${styles["label"]}`}>Progress</div>
          <div className={styles["row"]} style={{ width: 143 }}>
            <InputField
              placeholder="70%"
              value={form.progress}
              onChange={(e) =>
                setForm({ ...form, progress: e.currentTarget.value })
              }
            />
          </div>
        </div>
      </div>
      <div className={styles["footer"]}>
        <div className={styles["action-button"]}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={() => null}>
            Save Task
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
