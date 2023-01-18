import React, { useState } from "react";
import ArrowLeftIcon from "../../../assets/svgs/ArrowLeftIcon";
import ArrowRightIcon from "../../../assets/svgs/ArrowRightIcon";
import DeleteIcon from "../../../assets/svgs/DeleteIcon";
import EditIcon from "../../../assets/svgs/EditIcon";
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
}> = ({ onClick }) => {
  const [hover, setHover] = useState("");

  return (
    <div className={styles["container"]}>
      {opts.map(({ Icon, ...item }, index) => (
        <div
          className={`${styles["item"]} ${styles[item.slug]} ${
            hover === item.slug ? styles["hover"] : ""
          }`}
          key={`option-${index}`}
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
      ))}
    </div>
  );
};

export default MenuDialog;
