import React, { useState } from "react";
import Progress from "../../atoms/Progress/Progress";
import SettingButton from "../SettingButton/SettingButton";
import styles from "./Task.module.scss";

interface IItem {
  created_at: string;
  done: unknown;
  id: number;
  name: string;
  progress_percentage: number;
  todo_id: number;
  updated_at: string;
}
const Task: React.FC<{
  todoId: number;
  data: IItem;
  onDrag: (data: { todoId: number; item: IItem }) => void;
  onDragEnd: () => void;
}> = ({ data, todoId, onDragEnd, onDrag }) => {
  const [isDraggable, setIsDraggable] = useState(true);

  return (
    <div
      className={`${styles["container"]} ${
        isDraggable ? styles["draggable"] : ""
      }`}
      draggable={isDraggable}
      onDrag={() => onDrag({ todoId: todoId, item: data })}
      onDragEnd={onDragEnd}
    >
      <div className={styles["title"]}>{data.name}</div>
      <div className={styles["divider"]} />
      <div className={styles["footer"]}>
        <Progress number={data.progress_percentage} />
        <SettingButton
          todoId={todoId}
          data={data}
          onSelectedMenu={(slug) => setIsDraggable(!!!slug)}
        />
      </div>
    </div>
  );
};

export default Task;
