import React from "react";
import Progress from "../../atoms/Progress/Progress";
import SettingButton from "../SettingButton/SettingButton";
import styles from "./Task.module.scss";

const Task: React.FC = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["title"]}>
        Bundle interplanetary analytics for improved transmission
      </div>
      <div className={styles["divider"]} />
      <div className={styles["footer"]}>
        <Progress number={20} />
        <SettingButton />
      </div>
    </div>
  );
};

export default Task;
