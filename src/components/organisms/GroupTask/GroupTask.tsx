import React, { useEffect, useState } from "react";
import Label from "../../atoms/Label/Label";
import Task from "../../molecules/Task/Task";
import styles from "./GroupTask.module.scss";
import plus from "../../../assets/images/plus.png";
import Modal from "../../atoms/Modal/Modal";
import CreateEditTask from "../../molecules/CreateEditTask/CreateEditTask";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../../../domain/todos/todos.thunk";

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

const GroupTask: React.FC<{
  variant: "primary" | "warning" | "danger" | "success";
  data: ITodo;
  onDrag: (data: { todoId: number; item: IItem }) => void;
  onDragEnd: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, todo: ITodo) => void;
  overId: number | null;
  setOverId: (overId: number | null) => void;
}> = ({ data, variant, onDrag, onDragEnd, onDrop, overId, setOverId }) => {
  const [openModal, setOpenModal] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const todosStore = useSelector((state: RootState) => state.todos);
  const [oneTime, setOneTime] = useState(true);
  useEffect(() => {
    if (
      !todosStore.isLoadingItems &&
      todosStore.gettingIndexItem === data.index
    ) {
      if (oneTime && todosStore.todos) {
        setOneTime(false);
        dispatch(getItems(todosStore.todos[todosStore.gettingIndexItem].id));
      }
    }
  }, [
    data.index,
    dispatch,
    oneTime,
    todosStore.gettingIndexItem,
    todosStore.isLoadingItems,
    todosStore.todos,
  ]);

  return (
    <>
      <div
        className={`${styles["container"]} ${styles[variant]}`}
        onDragOver={(e) => {
          e.preventDefault();
          setOverId(data.id);
        }}
        onDrop={(e) => onDrop(e, data)}
      >
        <Label variant={variant}>{data.title}</Label>
        <div className={styles["date"]}>{data.description}</div>
        <div className={styles["tasks-list"]}>
          {todosStore.items
            .filter((item) => item.id === data.id)[0]
            ?.data?.map((item, index) => (
              <React.Fragment key={`task-${index}`}>
                <Task
                  todoId={data.id}
                  data={item}
                  onDrag={onDrag}
                  onDragEnd={onDragEnd}
                />
              </React.Fragment>
            ))}
          {overId && overId === data.id && (
            <div className={styles["empty-task"]}></div>
          )}
        </div>
        <div className={styles["add-new"]} onClick={() => setOpenModal(true)}>
          <img className={styles["plus"]} src={plus} alt="" loading="lazy" />
          <div className={styles["text"]}>New Task</div>
        </div>
      </div>

      {openModal && (
        <Modal onClose={() => setOpenModal(false)}>
          <CreateEditTask
            onClose={() => setOpenModal(false)}
            todoId={data.id}
          />
        </Modal>
      )}
    </>
  );
};

export default GroupTask;
