import React, { useEffect, useState } from "react";
import styles from "./CreateGroup.module.scss";
import close from "../../../assets/images/close.png";
import InputField from "../../atoms/InputField/InputField";
import Button from "../../atoms/Button/Button";
import TextField from "../../atoms/TextField/TextField";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { postTodo } from "../../../domain/todos/todos.thunk";
import { resetPostTodo } from "../../../domain/todos/todos.reducer";

const CreateGroup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const dispatch: AppDispatch = useDispatch();
  const todosStore = useSelector((state: RootState) => state.todos);

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(postTodo(form));
  };

  useEffect(() => {
    if (todosStore.errorCreateTodo) {
      dispatch(resetPostTodo());
      alert("fail");
    }
    if (todosStore.createTodo) {
      dispatch(resetPostTodo());
      onClose();
    }
  }, [dispatch, onClose, todosStore.createTodo, todosStore.errorCreateTodo]);

  return (
    <form className={styles["container"]} onSubmit={onSubmit}>
      <div className={styles["header"]}>
        <div className={styles["title"]}>Add New Group</div>
        <div className={styles["close"]} onClick={onClose}>
          <img src={close} loading="lazy" alt="" />
        </div>
      </div>
      <div className={styles["body"]}>
        <div className={styles["group"]}>
          <div className={`${styles["row"]} ${styles["label"]}`}>Title</div>
          <div className={styles["row"]}>
            <InputField
              placeholder="Placeholder"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.currentTarget.value })
              }
            />
          </div>
        </div>
        <div className={styles["group"]}>
          <div className={`${styles["row"]} ${styles["label"]}`}>
            Description
          </div>
          <div className={styles["row"]}>
            <TextField
              placeholder="Placeholder"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.currentTarget.value })
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
            disable={todosStore.isLoadingCreateTodo}
            type={"submit"}
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateGroup;
