import React, { useState } from "react";
import styles from "./CreateGroup.module.scss";
import close from "../../../assets/images/close.png";
import InputField from "../../atoms/InputField/InputField";
import Button from "../../atoms/Button/Button";
import TextField from "../../atoms/TextField/TextField";

const CreateGroup: React.FC = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <div className={styles["title"]}>Add New Group</div>
        <div className={styles["close"]}>
          <img src={close} loading="lazy" alt="" />
        </div>
      </div>
      <div className={styles["body"]}>
        <div className={styles["group"]}>
          <div className={`${styles["row"]} ${styles["label"]}`}>Title</div>
          <div className={styles["row"]}>
            <InputField
              placeholder="Placeholder"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.currentTarget.value })
              }
            />
          </div>
        </div>
        <div className={styles["group"]}>
          <div className={`${styles["row"]} ${styles["label"]}`}>
            Description
          </div>
          <div className={styles["row"]}>
            <TextField
              placeholder="Placeholder"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.currentTarget.value })
              }
            />
          </div>
        </div>
      </div>
      <div className={styles["footer"]}>
        <div className={styles["action-button"]}>
          <Button onClick={() => null}>Cancel</Button>
          <Button variant="primary" onClick={() => null}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
