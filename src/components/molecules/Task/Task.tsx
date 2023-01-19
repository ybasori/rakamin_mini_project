import React from "react";
import Progress from "../../atoms/Progress/Progress";
import SettingButton from "../SettingButton/SettingButton";
import styles from "./Task.module.scss";

const Task: React.FC<{
  data: {
    created_at: string;
    done: unknown;
    id: number;
    name: string;
    progress_percentage: number;
    todo_id: number;
    updated_at: string;
  };
}> = ({ data }) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["title"]}>{data.name}</div>
      <div className={styles["divider"]} />
      <div className={styles["footer"]}>
        <Progress number={data.progress_percentage} />
        <SettingButton />
      </div>
    </div>
  );
};

export default Task;
