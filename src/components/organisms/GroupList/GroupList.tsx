import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "../../../domain/todos/todos.thunk";
import { AppDispatch, RootState } from "../../../store";
import GroupTask from "../GroupTask/GroupTask";
import styles from "./GroupList.module.scss";

const variants = ["primary", "warning", "danger", "success"];

const GroupList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const todosStore = useSelector((state: RootState) => state.todos);
  const [oneTime, setOneTime] = useState(true);
  useEffect(() => {
    if (!todosStore.isLoadingTodos) {
      if (oneTime && !todosStore.errorTodos) {
        setOneTime(false);
        dispatch(getTodos());
      }
    }
  }, [dispatch, oneTime, todosStore.errorTodos, todosStore.isLoadingTodos]);
  return (
    <div className={styles["container"]}>
      {todosStore.todos?.map((item) => (
        <GroupTask
          data={item}
          variant={
            variants[Math.floor(Math.random() * variants.length)] as
              | "primary"
              | "warning"
              | "danger"
              | "success"
          }
        />
      ))}
    </div>
  );
};

export default GroupList;
