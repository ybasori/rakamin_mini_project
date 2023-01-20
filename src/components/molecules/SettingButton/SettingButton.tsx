import React, { useEffect, useState } from "react";
import styles from "./SettingButton.module.scss";
import tripplDots from "../../../assets/images/tripple-dots.png";
import MenuDialog from "../../atoms/MenuDialog/MenuDialog";
import Modal from "../../atoms/Modal/Modal";
import CreateEditTask from "../CreateEditTask/CreateEditTask";
import DeleteTask from "../DeleteTask/DeleteTask";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { moveItem } from "../../../domain/todos/todos.thunk";
import { resetMoveItem } from "../../../domain/todos/todos.reducer";

const SettingButton: React.FC<{
  todoId: number;
  data: {
    created_at: string;
    done: unknown;
    id: number;
    name: string;
    progress_percentage: number;
    todo_id: number;
    updated_at: string;
  };
  onSelectedMenu: (slug: string) => void;
}> = ({ todoId, data, onSelectedMenu }) => {
  const dispatch: AppDispatch = useDispatch();
  const todosStore = useSelector((state: RootState) => state.todos);
  const [active, setActive] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");

  useEffect(() => {
    if (!todosStore.isLoadingMoveItem) {
      onSelectedMenu(selectedMenu);
      if (selectedMenu === "move-right") {
        dispatch(moveItem({ todoId, itemId: data.id, move: 1 }));
        setSelectedMenu("");
        dispatch(resetMoveItem());
      }
      if (selectedMenu === "move-left") {
        dispatch(moveItem({ todoId, itemId: data.id, move: -1 }));
        setSelectedMenu("");
        dispatch(resetMoveItem());
      }
    }
  }, [
    data.id,
    dispatch,
    onSelectedMenu,
    selectedMenu,
    todoId,
    todosStore.isLoadingMoveItem,
  ]);

  return (
    <>
      {active && (
        <div className={styles["bg"]} onClick={() => setActive(false)} />
      )}
      <div className={styles["container"]}>
        <div
          className={styles["button"]}
          onClick={() => setActive((prev) => !prev)}
        >
          <img alt="" loading="lazy" src={tripplDots} />
        </div>
        {active && (
          <div className={styles["dropdown"]}>
            <MenuDialog
              todoId={todoId}
              onClick={(slug) => {
                setSelectedMenu(slug);
                return setActive(false);
              }}
            />
          </div>
        )}
      </div>
      {(selectedMenu === "delete" || selectedMenu === "edit") && (
        <Modal onClose={() => setSelectedMenu("")}>
          {selectedMenu === "edit" && (
            <CreateEditTask
              todoId={todoId}
              edit={data}
              onClose={() => setSelectedMenu("")}
            />
          )}
          {selectedMenu === "delete" && (
            <DeleteTask
              todoId={todoId}
              itemId={data.id}
              onClose={() => setSelectedMenu("")}
            />
          )}
        </Modal>
      )}
    </>
  );
};

export default SettingButton;
