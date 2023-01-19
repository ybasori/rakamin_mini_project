import React, { useEffect, useState } from "react";
import styles from "./CreateEditTask.module.scss";
import close from "../../../assets/images/close.png";
import InputField from "../../atoms/InputField/InputField";
import Button from "../../atoms/Button/Button";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { postItem } from "../../../domain/todos/todos.thunk";
import { resetCreateItem, addItem } from "../../../domain/todos/todos.reducer";

const CreateEditTask: React.FC<{
  todoId?: number;
  edit?: boolean;
  onClose: () => void;
}> = ({ todoId, edit = false, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    progress_percentage: "",
  });
  const dispatch: AppDispatch = useDispatch();
  const todosStore = useSelector((state: RootState) => state.todos);

  const onSubmit = () => {
    if (todoId) {
      dispatch(postItem({ body: form, todoId }));
    }
  };

  useEffect(() => {
    if (todosStore.errorCreateItem) {
      dispatch(resetCreateItem());
      alert("fail");
    }
    if (todosStore.createItem) {
      dispatch(
        addItem({
          indexTodos:
            todosStore.todos?.findIndex((item) => item.id === todoId) ?? 0,
          item: todosStore.createItem,
        })
      );
      dispatch(resetCreateItem());
      onClose();
    }
  }, [
    todosStore.errorCreateItem,
    dispatch,
    todosStore.createItem,
    onClose,
    todosStore.todos,
    todoId,
  ]);

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
              type="number"
              placeholder="70%"
              value={form.progress_percentage}
              onChange={(e) =>
                setForm({ ...form, progress_percentage: e.currentTarget.value })
              }
            />
          </div>
        </div>
      </div>
      <div className={styles["footer"]}>
        <div className={styles["action-button"]}>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            variant="primary"
            disable={todosStore.isLoadingCreateItem}
            onClick={onSubmit}
          >
            Save Task
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateEditTask;
