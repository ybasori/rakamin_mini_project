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

const GroupTask: React.FC<{
  variant: "primary" | "warning" | "danger" | "success";
  data: {
    index: number;
    id: number;
    title: string;
    description: string;
    created_by: string;
    created_at: string;
    updated_at: string;
  };
}> = ({ data, variant }) => {
  const [openModal, setOpenModal] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const todosStore = useSelector((state: RootState) => state.todos);
  const [oneTime, setOneTime] = useState(true);
  useEffect(() => {
    if (
      !todosStore.isLoadingItems &&
      todosStore.gettingIndexItem === data.index
    ) {
      if (oneTime) {
        setOneTime(false);
        dispatch(getItems(todosStore.gettingIndexItem));
      }
    }
  }, [
    data.index,
    dispatch,
    oneTime,
    todosStore.errorItems,
    todosStore.gettingIndexItem,
    todosStore.isLoadingItems,
  ]);

  return (
    <>
      <div className={`${styles["container"]} ${styles[variant]}`}>
        <Label variant={variant}>{data.title}</Label>
        <div className={styles["date"]}>{data.description}</div>
        <div className={styles["tasks-list"]}>
          {todosStore.items
            .filter((item) => item.id === data.id)[0]
            ?.data?.map((item, index) => (
              <Task key={`task-${index}`} todoIndex={data.index} data={item} />
            ))}
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
