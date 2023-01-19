import React, { useState } from "react";
import { useSelector } from "react-redux";
import ArrowLeftIcon from "../../../assets/svgs/ArrowLeftIcon";
import ArrowRightIcon from "../../../assets/svgs/ArrowRightIcon";
import DeleteIcon from "../../../assets/svgs/DeleteIcon";
import EditIcon from "../../../assets/svgs/EditIcon";
import { RootState } from "../../../store";
import styles from "./MenuDialog.module.scss";

type ISlug = "move-right" | "move-left" | "edit" | "delete";

const opts = [
  {
    Icon: ArrowRightIcon,
    text: "Move Right",
    slug: "move-right",
  },
  {
    Icon: ArrowLeftIcon,
    text: "Move Left",
    slug: "move-left",
  },
  {
    Icon: EditIcon,
    text: "Edit",
    slug: "edit",
  },
  {
    Icon: DeleteIcon,
    text: "Delete",
    slug: "delete",
  },
];

const MenuDialog: React.FC<{
  onClick: (slug: ISlug) => void;
  todoId: number;
}> = ({ onClick, todoId }) => {
  const [hover, setHover] = useState("");
  const todosStore = useSelector((state: RootState) => state.todos);

  return (
    <div className={styles["container"]}>
      {opts.map(({ Icon, ...item }, index) => (
        <React.Fragment key={`option-${index}`}>
          {item.slug === "move-left" &&
          todosStore.todos?.findIndex((todo) => todo.id === todoId) === 0 ? (
            <></>
          ) : (
            <>
              {item.slug === "move-right" &&
              todosStore.todos?.findIndex((todo) => todo.id === todoId) ===
                (todosStore.todos?.length ?? 0) - 1 ? (
                <></>
              ) : (
                <div
                  className={`${styles["item"]} ${styles[item.slug]} ${
                    hover === item.slug ? styles["hover"] : ""
                  }`}
                  onMouseEnter={() => setHover(item.slug)}
                  onMouseLeave={() => setHover("")}
                  onClick={() => onClick(item.slug as ISlug)}
                >
                  <div className={styles["icon"]}>
                    <Icon
                      color={
                        hover === item.slug && item.slug !== "delete"
                          ? "#01959f"
                          : hover === item.slug
                          ? "#E11428"
                          : undefined
                      }
                    />
                  </div>
                  <div className={styles["text"]}>{item.text}</div>
                </div>
              )}
            </>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default MenuDialog;
