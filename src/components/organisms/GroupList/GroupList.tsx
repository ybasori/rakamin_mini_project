import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos, moveItem } from "../../../domain/todos/todos.thunk";
import { AppDispatch, RootState } from "../../../store";
import GroupTask from "../GroupTask/GroupTask";
import styles from "./GroupList.module.scss";

interface ITodo {
  index?: number;
  id: number;
  title: string;
  description: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

interface IItem {
  created_at: string;
  done: unknown;
  id: number;
  name: string;
  progress_percentage: number;
  todo_id: number;
  updated_at: string;
}

const variants = ["primary", "warning", "danger", "success"];

const GroupList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const todosStore = useSelector((state: RootState) => state.todos);
  const [oneTime, setOneTime] = useState(true);

  const [dragData, setDragData] = useState<{
    todoId: number;
    item: IItem;
  } | null>(null);

  const onDrag = (data: { todoId: number; item: IItem }) => {
    setDragData(data);
  };
  const onDrop = (todo: ITodo) => {
    if (dragData !== null) {
      const dragTodoIndex = todosStore.todos?.findIndex(
        (item) => item.id === dragData.todoId
      );
      const targetIndex = todosStore.todos?.findIndex(
        (item) => item.id === todo.id
      );
      const move = (targetIndex ?? 0) - (dragTodoIndex ?? 0);
      if (move !== 0) {
        dispatch(
          moveItem({
            todoId: dragData.todoId,
            itemId: dragData.item.id,
            move: (targetIndex ?? 0) - (dragTodoIndex ?? 0),
          })
        );
      }
    }
  };

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
      {todosStore.todos?.map((todo, index) => (
        <GroupTask
          key={`grouptask-${index}`}
          data={{ ...todo, index }}
          variant={
            variants[Math.floor(Math.random() * variants.length)] as
              | "primary"
              | "warning"
              | "danger"
              | "success"
          }
          onDrag={onDrag}
          onDragEnd={() => setDragData(null)}
          dragData={dragData}
          onDrop={() => onDrop(todo)}
        />
      ))}
    </div>
  );
};

export default GroupList;
