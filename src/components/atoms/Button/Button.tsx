import React from "react";
import styles from "./Button.module.scss";

const Button: React.FC<{
  type?: "submit" | "button";
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: "default" | "primary" | "danger";
  disable?: boolean;
}> = ({
  children,
  onClick = () => null,
  variant = "default",
  disable = false,
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={`${styles["button"]} ${styles[variant]}`}
      onClick={disable ? () => null : onClick}
    >
      {children}
    </button>
  );
};

export default Button;
