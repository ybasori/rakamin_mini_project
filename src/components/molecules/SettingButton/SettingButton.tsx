import React, { useState } from "react";
import styles from "./SettingButton.module.scss";
import tripplDots from "../../../assets/images/tripple-dots.png";
import MenuDialog from "../../atoms/MenuDialog/MenuDialog";
import Modal from "../../atoms/Modal/Modal";
import CreateEditTask from "../CreateEditTask/CreateEditTask";
import DeleteTask from "../DeleteTask/DeleteTask";

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
}> = ({ todoId, data }) => {
  const [active, setActive] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");
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
