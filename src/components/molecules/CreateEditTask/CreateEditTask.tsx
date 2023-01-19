import React, { useEffect, useState } from "react";
import styles from "./CreateEditTask.module.scss";
import close from "../../../assets/images/close.png";
import InputField from "../../atoms/InputField/InputField";
import Button from "../../atoms/Button/Button";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { postItem, editItem } from "../../../domain/todos/todos.thunk";
import {
  resetCreateItem,
  addItem,
  resetEditItem,
  updateItem,
} from "../../../domain/todos/todos.reducer";

const CreateEditTask: React.FC<{
  todoId?: number;
  edit?: {
    created_at: string;
    done: unknown;
    id: number;
    name: string;
    progress_percentage: number;
    todo_id: number;
    updated_at: string;
  };
  onClose: () => void;
}> = ({ todoId, edit, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    progress_percentage: "",
  });
  const dispatch: AppDispatch = useDispatch();
  const todosStore = useSelector((state: RootState) => state.todos);

  const onSubmit = () => {
    if (todoId && !edit) {
      dispatch(postItem({ body: form, todoId }));
    }
    if (todoId && edit) {
      dispatch(editItem({ body: form, todoId, itemId: edit.id }));
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
          todoId,
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

  useEffect(() => {
    if (todosStore.errorEditItem) {
      dispatch(resetEditItem());
      alert("fail");
    }
    if (todosStore.editItem) {
      dispatch(
        updateItem({
          todoId,
          itemId: edit?.id,
          item: todosStore.editItem,
        })
      );
      dispatch(resetEditItem());
      onClose();
    }
  }, [
    dispatch,
    edit?.id,
    onClose,
    todoId,
    todosStore.editItem,
    todosStore.errorEditItem,
  ]);

  useEffect(() => {
    if (edit) {
      setForm({
        name: edit.name,
        progress_percentage: `${edit.progress_percentage}`,
      });
    }
  }, [edit]);
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
