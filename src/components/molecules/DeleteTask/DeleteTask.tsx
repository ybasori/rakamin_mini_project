import React, { useEffect } from "react";
import styles from "./DeleteTask.module.scss";
import close from "../../../assets/images/close.png";
import Button from "../../atoms/Button/Button";
import exclamation from "../../../assets/images/exclamation.png";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem } from "../../../domain/todos/todos.thunk";
import {
  removeItem,
  resetDeleteItem,
} from "../../../domain/todos/todos.reducer";

const DeleteTask: React.FC<{
  onClose: () => void;
  todoId: number;
  itemId: number;
}> = ({ onClose, todoId, itemId }) => {
  const dispatch: AppDispatch = useDispatch();
  const todosStore = useSelector((state: RootState) => state.todos);
  const onSubmit = () => {
    dispatch(deleteItem({ todoId, itemId }));
  };

  useEffect(() => {
    if (todosStore.deleteItem || todosStore.errorDeleteItem) {
      dispatch(resetDeleteItem());
      dispatch(removeItem({ todoId, itemId }));
      onClose();
    }
  }, [
    dispatch,
    itemId,
    onClose,
    todoId,
    todosStore.deleteItem,
    todosStore.errorDeleteItem,
  ]);

  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <img
          className={styles["exclamation"]}
          src={exclamation}
          alt=""
          loading="lazy"
        />
        <div className={styles["title"]}>Delete Task</div>
        <div className={styles["close"]} onClick={onClose}>
          <img src={close} loading="lazy" alt="" />
        </div>
      </div>
      <div className={styles["body"]}>
        <div className={styles["text"]}>
          Are you sure want to delete this task? your action can’t be reverted.
        </div>
      </div>
      <div className={styles["footer"]}>
        <div className={styles["action-button"]}>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            variant="danger"
            disable={todosStore.isLoadingDeleteItem}
            onClick={onSubmit}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTask;
